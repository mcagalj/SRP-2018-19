//--------------------------------
//  POST /
//---------------------------------

const LoginSchemas = require("./login.schemas");
const SchemaValidator = require("../middleware/validate-api");
const LoginController = require("../controllers/login.controller");
const express = require("express");
const router = express.Router();

SchemaValidator.addSchemas(LoginSchemas);

router.post(
  "/",
  SchemaValidator.validate("login"),
  LoginController.verifyCredentials
);

module.exports = router;
