const store = require("../fake-db/store");
const debug = require("debug")("rest-server:controllers.login");

//------------------------------------------------
// Verifies submitted credentials
// (i.e., username and password in our example).
// Upon a successful verification, generate an
// authentication token and send it back to the
// authenticated user.
//------------------------------------------------
exports.verifyCredentials = async (req, res) => {
  debug(req.body);

  const { username, password } = req.body;
  const usernames = store.get("usernames");

  if (!usernames.has(username)) {
    debug({ error: "Wrong username" });
    return res.status(401).send({ message: "Authentication failure" });
  }

  const userID = usernames.get(username);
  const users = store.get("users");
  const user = users.get(userID);

  // TBD: try/catch
  const validPassword = await user.validPassword(password);

  if (!validPassword) {
    debug({ error: "Wrong password" });
    return res.status(401).send({ message: "Authentication failure" });
  }

  const token = user.generateJWT();
  return res.send({ message: "Authentication successful", token });
};
