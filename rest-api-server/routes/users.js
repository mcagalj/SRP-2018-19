//--------------------------------
//  GET /api/users/:page?
//  POST /api/users
//
//  GET /api/users/:id
//  PUT /api/users/:id
//  DELETE /api/users/:id
//---------------------------------

const UsersSchemas = require("./users.schemas");
const SchemaValidator = require("../middleware/validate-api");
const authorize = require("./../middleware/authorization");
const UsersController = require("../controllers/users.controller");
const express = require("express");
const router = express.Router();

SchemaValidator.addSchemas(UsersSchemas);

router.get(
  "/:nextPage(\\d+)?",
  authorize(["admin"]),
  UsersController.get_users
);
router.get("/:userID", authorize(["admin"]), UsersController.get_user);

router.post(
  "/",
  authorize(["add_user"]),
  SchemaValidator.validate("add_user"),
  UsersController.add_user
);

router.put(
  "/:userID",
  authorize(["admin", "update_user"], "userID"),
  SchemaValidator.validate("update_user"),
  UsersController.update_user
);

router.patch(
  "/:userID",
  authorize(["admin"], "userID"),
  SchemaValidator.validate("update_role"),
  UsersController.update_role
);

router.delete(
  "/:userID",
  authorize(["admin", "delete_user"], "userID"),
  UsersController.delete_user
);

module.exports = router;
