const store = require("../fake-db/store");
const Post = require("../models/post");
const paginate = require("../utils/paginate");
const debug = require("debug")("rest-server:controllers.posts");

//---------------------------------------
// Return all posts from the store
//---------------------------------------
exports.get_posts = (req, res) => {
  const { nextPage = 1 } = req.params;

  // Paginate
  const posts = paginate([...store.get("posts").values()], nextPage);

  return res.send(posts);
};

//---------------------------------------
// Return the post
//---------------------------------------
exports.get_post = (req, res) => {
  const { postID } = req.params;
  const post = store.get("posts").get(postID);

  if (!post) {
    return res.status(404).send({});
  }

  return res.send(post.toPublicJSON);
};

//---------------------------------------
// Add a new post to the store
//---------------------------------------
exports.add_post = async (req, res) => {
  const { title, content, author } = req.body;

  // Get the author from the token
  const { id: author } = req.user;

  const post = new Post({
    title,
    content,
    author
  });

  // TBD: try/catch
  await post.save();

  res.send(post.toPublicJSON);
};

//---------------------------------------
// Update the existing post
//---------------------------------------
exports.update_post = async (req, res) => {
  const { postID } = req.params;
  const { _posts: posts } = req;

  // Does the requested post exist
  if (!posts.has(postID)) {
    return res
      .status(404)
      .send({ message: "The requested post does not exist" });
  }

  const { title, content } = req.body;
  const post = posts.get(postID);

  if (title) {
    // Updating the title of the post
    post.title = title;
  }

  if (content) {
    // Updating the content of the post
    post.content = content;
  }

  // Finally, update the store (TBD: try/catch)
  await post.save();

  res.send(post.toPublicJSON);
};

//---------------------------------------
// Delete a post
//---------------------------------------
exports.delete_post = (req, res) => {
  const { postID } = req.params;
  const { _posts: posts } = req;
  // const posts = store.get("posts");

  if (!posts.has(postID)) {
    return res
      .status(404)
      .send({ message: "The requested post does not exist" });
  }

  posts.delete(postID);

  res.status(204).send({});
};

//---------------------------------------
// Expose the authorID of the given post
// to the subsequent middleware.
//
// This information is consumed by
// the access control logic later on.
//---------------------------------------
exports.set_author = (req, _, next) => {
  const { postID } = req.params;

  // In production, we make a DB lookup here.
  // To avoid duplicate DB lookups in the subsequent
  // processing logic, we will attach a reference to
  // the posts to the current req object.
  const posts = store.get("posts");
  const post = posts.get(postID);
  req._posts = posts;

  if (post) {
    req.params.authorID = post.author;
  }

  next();
};
