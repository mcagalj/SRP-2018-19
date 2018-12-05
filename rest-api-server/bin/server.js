const debug = require("debug")("rest-server:server");
const app = require("../app");
const http = require("http");
const https = require("https");

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      console.error("Selected port requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error("Selected port is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const { address, port } = this.address();
  debug(`Listening on ${address}:${port}`);
}

let port, server;

if (process.env.HTTPS) {
  port = normalizePort(process.env.HTTPS_PORT || 4430);
  server = https.createServer(config.HTTPS, app);
} else {
  port = normalizePort(process.env.PORT || 8000);
  server = http.createServer(app);
}

//---------------------------
// Start RESTful server
//---------------------------
server.listen(port, process.env.ADDRESS || "127.0.0.1");
server.on("error", onError);
server.on("listening", onListening);
