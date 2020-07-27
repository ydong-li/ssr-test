const express = require("express");
var bodyParser = require("body-parser");
// import proxy from 'express-http-proxy'
import ssr from "./ssr.js";

const app = express();
app.use(bodyParser.json());

app.get("/api", (req, res) => {
    res.send("api data");
  // setTimeout(() => {
  // }, 1000);
});

//设置跨域访问
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  next();
});

app.use(express.static("build"));
ssr(app);

app.listen(3777);
