const store = require("../fake-db/store");
const User = require("../models/user");
const paginate = require("../utils/paginate");
const debug = require("debug")("rest-server:controllers.users");

//---------------------------------------
// Return all users from the store
//---------------------------------------
exports.get_users = (req, res) => {
  const { nextPage = 1 } = req.params;
  const filter = user => user.toPublicJSON;

  // Paginate and filter out private info
  const users = paginate([...store.get("users").values()], nextPage, filter);

  return res.send(users);
};

//---------------------------------------
// Return the given user
//---------------------------------------
exports.get_user = (req, res) => {
  const { userID } = req.params;
  const user = store.get("users").get(userID);

  if (!user) {
    return res.status(404).send({});
  }

  return res.send(user.toPublicJSON);
};

//---------------------------------------
// Add a new user to the store
//---------------------------------------
exports.add_user = async (req, res) => {
  const { username, name, password } = req.body;
  const usernames = store.get("usernames");

  // Check if the provided username already exist in the store
  if (usernames.has(username)) {
    return res.status(409).send({ message: "The selected username is taken" });
  }

  const user = new User({
    username,
    name,
    role: "member"
  });

  // TBD: try/catch
  user.setPassword(password);
  await user.save();

  res.send(user.toPublicJSON);
};

//---------------------------------------
// Update the existing user
//---------------------------------------
exports.update_user = async (req, res) => {
  const { userID } = req.params;
  const users = store.get("users");

  // Does the requested user exist
  if (!users.has(userID)) {
    return res
      .status(404)
      .send({ message: "The requested user does not exist" });
  }

  // Let's update the requested user
  const { name, password } = req.body;
  const user = users.get(userID);

  if (name) {
    user.name = name;
  }

  if (password) {
    // Updating the password (TBD: try/catch)
    await user.setPassword(password);
  }

  // Finally, update the store (TBD: try/catch)
  await user.save();

  res.send(user.toPublicJSON);
};

//---------------------------------------
// Change the user's role.
// This action can only be run by admin.
//---------------------------------------
exports.update_role = async (req, res) => {
  const { userID } = req.params;
  const users = store.get("users");

  // Does the requested user exist
  if (!users.has(userID)) {
    return res
      .status(404)
      .send({ message: "The requested user does not exist" });
  }

  // Let's update the requested user
  const { role } = req.body;
  const user = users.get(userID);

  if (role) {
    // Updating the role
    user.role = role;
  }

  // Finally, update the store (TBD: try/catch)
  await user.save();

  res.send(user.toPublicJSON);
};

//---------------------------------------
// Delete a user
//---------------------------------------
exports.delete_user = (req, res) => {
  const { userID } = req.params;
  const users = store.get("users");

  // We can delete only the existing user
  if (!users.has(userID)) {
    return res
      .status(404)
      .send({ message: "The requested user does not exist" });
  }

  const user = users.get(userID);
  const usernames = store.get("usernames");

  usernames.delete(user.username);
  users.delete(userID);

  res.status(204).send({});
};
