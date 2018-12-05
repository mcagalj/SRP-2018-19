const debug = require("debug")("rest-server:authorization");
const RBAC = require("./fesb-rbac");

const auth = (permissions, parameter) => (req, res, next) => {
  if (!Array.isArray(permissions)) {
    return next(Error("Permissions: expected array"));
  }

  const { user = {} } = req;
  let params;

  if (parameter) {
    const { [parameter]: objectID } = req.params;

    params = {
      subjectID: user.id,
      objectID
    };
  }

  //------------------------------------------------
  // Verify if the given user has at least one
  // permission listed in "permissions" array.
  //------------------------------------------------
  const authorized = permissions.some(permission =>
    RBAC.authorized(user.role, permission, params)
  );

  if (authorized) {
    debug(
      `${user.username} authorized (required permission/s: ${permissions})`
    );
    return next();
  }

  debug(
    `${user.username} NOT authorized (required permission/s: ${permissions})`
  );

  return res
    .status(403)
    .send({ message: "You do not have permission for this action" });
};

module.exports = auth;
