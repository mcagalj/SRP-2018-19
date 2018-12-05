exports.add_post = {
  title: "new post",
  type: "object",
  properties: {
    title: { type: "string" },
    content: { type: "string" },
    author: { type: "string" }
  },
  required: ["title", "content", "author"]
};

exports.update_post = {
  title: "update post",
  type: "object",
  properties: {
    title: { type: "string" },
    content: { type: "string" }
  },
  anyOf: [{ required: ["title"] }, { required: ["content"] }]
};
