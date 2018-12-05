const jwt = require("jsonwebtoken");
const debug = require("debug")("rest-server:authentication");

const auth = async (req, res, next) => {
  try {
    const token = await verifyJWT(
      getTokenFromHeader(req),
      process.env.JWT_SECRET
    );

    // Expose the verified user to subsequent middleware and route handlers
    req.user = token;

    return next();
  } catch (error) {
    debug(error);

    return res
      .status(401)
      .send({ message: "Missing or invalid authentication token" });
  }
};

/**
 * Promisfied JWT verification
 * @param {*} token
 */
function verifyJWT(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return reject({ error: error.message });
      }
      resolve(decoded);
    });
  });
}

/**
 * Retrieves encoded JWT
 * @param {*} req
 */
// https://github.com/gothinkster/node-express-realworld-example-app/blob/master/routes/auth.js
function getTokenFromHeader(req) {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
}

module.exports = auth;
