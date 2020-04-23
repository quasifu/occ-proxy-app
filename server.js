const express = require("express");
var proxy = require("express-http-proxy");
const cors = require("cors");
const server = express();
const cookieParser = require("cookie-parser");
const authMiddleware = require("./auth");

server.use(cors());
//server.use(cookieParser(process.env.PASSWORD));
server.use(express.urlencoded({ extended: true, strict: false }));
server.use(express.json());
server.use(authMiddleware);
server.all("/api/*", proxy(process.env.API_URL));
server.get("/*", proxy(process.env.URL));
const port = process.env.PORT ? process.env.PORT : 1337;

server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
