//--------------------------------
//  GET /api/posts/:page?
//  POST /api/posts
//
//  GET /api/posts/:id
//  PUT /api/posts/:id
//  DELETE /api/posts/:id
//---------------------------------

const PostsSchemas = require("./posts.schemas");
const SchemaValidator = require("../middleware/validate-api");
const authorize = require("./../middleware/authorization");
const PostsController = require("../controllers/posts.controller");
const express = require("express");
const router = express.Router();

SchemaValidator.addSchemas(PostsSchemas);

router.get(
  "/:nextPage(\\d+)?",
  authorize(["read_posts"]),
  PostsController.get_posts
);

router.get("/:postID", authorize(["read_posts"]), PostsController.get_post);

router.post(
  "/",
  authorize(["add_post"]),
  SchemaValidator.validate("add_post"),
  PostsController.add_post
);

router.put(
  "/:postID",
  PostsController.set_author, // Sets authorID to req.params
  authorize(["admin", "update_post"], "authorID"),
  SchemaValidator.validate("update_post"),
  PostsController.update_post
);

router.delete(
  "/:postID",
  PostsController.set_author, // Sets authorID to req.params
  authorize(["admin", "delete_post"], "authorID"),
  PostsController.delete_post
);

module.exports = router;
