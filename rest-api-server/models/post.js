const uuid = require("uuid/v4");

let store;

class Post {
  constructor({ title, content, author }) {
    this.id = uuid();
    this.createdAt = Date.now();
    this.title = title;
    this.content = content;
    this.author = author;
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

      this.updatedAt = Date.now();
      store.get("posts").set(this.id, this);

      resolve();
    });
  }

  get toPublicJSON() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt ? this.updatedAt : this.createdAt,
      title: this.title,
      content: this.content,
      author: this.author
    };
  }
}

module.exports = Post;
