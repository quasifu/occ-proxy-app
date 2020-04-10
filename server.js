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
server.all(
  "*",
  proxy(process.env.URL)
  // proxy(process.env.URL, {
  //   userResDecorator: function (proxyRes, proxyResData, userReq, userRes) {
  //     // data = JSON.parse(p);
  //     // data.newProperty = "exciting data";
  //     //console.log(userReq.url);
  //     let html = proxyResData.toString("utf8");
  //     return html;
  //     //return JSON.stringify(data);
  //   },
  // })
);

const port = process.env.PORT ? process.env.PORT : 1337;

server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
