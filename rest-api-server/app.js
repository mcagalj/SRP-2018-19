"use strict";

require("dotenv").config();

const debug = require("debug")("rest-server:app");
const logger = require("morgan");
const express = require("express");
const app = express();

//---------------------------
// INITIALIZE RBAC OBJECT
//---------------------------
const RBAC = require("./middleware/fesb-rbac");
const roles = require("./fake-db/roles");
RBAC.init(roles);
// debug(RBAC.roles);

const authenticate = require("./middleware/authentication");
const login = require("./routes/login");
const users = require("./routes/users");
const posts = require("./routes/posts");

//---------------------------
// REGISTER MIDDLEWARE
// (Remember that the order in
//  which you use the middleware
//  matters.)
//---------------------------
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//---------------------------
// REGISTER ROUTE HANDLERS
// AND CUSTOM MIDDLEWARE
//---------------------------
app.use("/api", authenticate);
app.use("/login", login);
app.use("/api/users", users);
app.use("/api/posts", posts);

//---------------------------
// ERROR HANDLERS
//---------------------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send({ error: "Requested resource not found" });
});

// ultimate error handler
app.use(function(err, req, res, next) {
  debug(err);
  res.status(err.status || 500);
  res.send({ error: err.message });
});

module.exports = app;
