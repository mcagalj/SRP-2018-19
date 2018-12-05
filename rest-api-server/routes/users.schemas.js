exports.add_user = {
  title: "new user",
  type: "object",
  properties: {
    username: { type: "string" },
    name: { type: "string" },
    password: { type: "string" }
  },
  required: ["username", "name", "password"]
};

exports.update_user = {
  title: "update user",
  type: "object",
  properties: {
    name: { type: "string" },
    password: { type: "string" }
  },
  anyOf: [{ required: ["name"] }, { required: ["password"] }]
};

exports.update_role = {
  title: "update role",
  type: "object",
  properties: {
    role: { enum: ["admin", "user", "guest"] }
  },
  required: ["role"]
};
