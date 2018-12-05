module.exports = {
  admin: {
    inherits: ["member", "test"],
    permissions: ["reset", "delete"]
  },

  member: {
    inherits: ["guest"],
    permissions: [
      "test",
      {
        name: "write",
        condition: params => (true ? true : false)
      },
      {
        name: "edit",
        condition: params => (true ? true : false)
      }
    ]
  },

  guest: {
    inherits: null,
    permissions: ["read"]
  },

  test: {
    inherits: ["guest", "admin"],
    permissions: null
  }
};
