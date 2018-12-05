"use strict";

const User = require("../models/user");
const Post = require("../models/post");
const debug = require("debug")("rest-server:store");

//------------------------------------
// Init the store with a set of users
//------------------------------------
const ante = new User({
  username: "aantic",
  name: "Ante Antic",
  role: "member"
});

const ivana = new User({
  username: "iivic",
  name: "Ivana Ivic",
  role: "admin"
});

const marko = new User({
  username: "mmarkic",
  name: "Marko Markic",
  role: "member"
});

const mirta = new User({
  username: "mmirtic",
  name: "Mirta Mirtic",
  role: "member"
});

const john = new User({
  username: "jdoe",
  name: "John Doe",
  role: "guest"
});

ante.setPasswordSync(process.env.USER_PASSWORD);
ivana.setPasswordSync(process.env.USER_PASSWORD);
marko.setPasswordSync(process.env.USER_PASSWORD);
mirta.setPasswordSync(process.env.USER_PASSWORD);
john.setPasswordSync(process.env.USER_PASSWORD);

//------------------------------------
// Also add a couple of posts
//------------------------------------
const post_1 = new Post({
  title: "Title 1",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin enim nulla, pretium sed porttitor eu, pulvinar a ligula. Sed vitae dictum tellus, sit amet luctus ex. Aliquam eget risus aliquam, sodales justo nec, ullamcorper nisi.",
  author: ante.id
});

const post_2 = new Post({
  title: "Title 2",
  content:
    "In pharetra erat in tincidunt imperdiet. Sed tempor, lorem in volutpat pulvinar, odio lectus laoreet turpis, eu aliquam nulla risus sit amet ex. Proin tempor eros nec nibh ultrices finibus. Suspendisse libero urna, consectetur at dapibus at, blandit sed est.",
  author: ivana.id
});

const post_3 = new Post({
  title: "Title 3",
  content:
    "Phasellus vitae facilisis nunc, sit amet tincidunt metus. Sed at dui semper, malesuada nulla a, tempus risus. Morbi mollis ut diam sit amet vulputate. Fusce ac tristique lacus, quis vestibulum neque.",
  author: ivana.id
});

const post_4 = new Post({
  title: "Title 4",
  content:
    "Sed libero ipsum, interdum rhoncus dolor sed, consectetur condimentum lacus. Donec ex est, luctus vel hendrerit nec, lacinia lacinia neque. Morbi eget tincidunt dui. Nam bibendum, libero at luctus tempus, justo justo malesuada ante, dignissim interdum sapien quam ut mi.",
  author: ivana.id
});

//----------------------------------
// Prepering the store
//----------------------------------
const usernames = new Map([
  [ante.username, ante.id],
  [ivana.username, ivana.id],
  [marko.username, marko.id],
  [mirta.username, mirta.id],
  [john.username, john.id]
]);

const users = new Map([
  [ante.id, ante],
  [ivana.id, ivana],
  [marko.id, marko],
  [mirta.id, mirta],
  [john.id, john]
]);

const posts = new Map([
  [post_1.id, post_1],
  [post_2.id, post_2],
  [post_3.id, post_3],
  [post_4.id, post_4]
]);

const store = new Map()
  .set("usernames", usernames)
  .set("users", users)
  .set("posts", posts);

module.exports = store;
