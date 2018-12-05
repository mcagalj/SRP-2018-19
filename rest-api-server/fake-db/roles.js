const condition = params => params.subjectID === params.objectID;

module.exports = {
  admin: {
    inherits: ["member"],
    permissions: ["admin"]
  },

  member: {
    inherits: ["guest"],
    permissions: [
      "add_user",
      {
        name: "update_user",
        condition
      },
      {
        name: "delete_user",
        condition
      },
      "add_post",
      {
        name: "update_post",
        condition
      },
      {
        name: "delete_post",
        condition
      }
    ]
  },

  guest: {
    inherits: null,
    permissions: ["read_posts"]
  }
};
