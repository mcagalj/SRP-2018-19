"use strict";

const uuid = require("uuid/v4");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const debug = require("debug")("rest-server:models.user");

let store;

class User {
  constructor({ username, name, role }) {
    this.id = uuid();
    this.username = username;
    this.name = name;
    this.role = role;
  }

  setPasswordSync(password) {
    const hash = bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
    this.hash = hash;
  }

  // setPassword(password) {
  //   return new Promise((resolve, reject) => {
  //     bcrypt.hash(password, Number(process.env.SALT_ROUNDS), (error, hash) => {
  //       if (error) return reject({ error: error.message });
  //       if (hash) {
  //         this.hash = hash;
  //         return resolve();
  //       }
  //     });
  //   });
  // }

  async setPassword(password) {
    // TBD: handle errors
    const hash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    this.hash = hash;
  }

  validPassword(password) {
    return bcrypt.compare(password, this.hash);
  }

  generateJWT() {
    return jwt.sign(this.toPublicJSON, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_DURATION
    });
  }

  save() {
    // Let's pretend that we use an asynchronous function.
    return new Promise((resolve, _) => {
      if (!store) {
        // The following import is a small trick to circumvent
        // situations in which we would be importing and caching
        // an empty store. This can happen when the store itself
        // "requires" user.js script. In this case, by requiring
        // the store at the top of user.js we only see an empty
        // object (the store has not been created yet).
        //
        // In real apps data are normally persisted in a db and
        // accessed via an appropriate ORM or ODM (sequelize, mongoose).
        store = require("../fake-db/store");
      }

      store.get("usernames").set(this.username, this.id);
      store.get("users").set(this.id, this);

      resolve();
    });
  }

  get toPublicJSON() {
    return {
      id: this.id,
      username: this.username,
      name: this.name,
      role: this.role
    };
  }

  get toPrivateJSON() {
    return {
      id: this.id,
      username: this.username,
      name: this.name,
      role: this.role,
      hash: this.hash
    };
  }
}

module.exports = User;
