const express = require("express");
var bodyParser = require("body-parser");
// import proxy from 'express-http-proxy'
import ssr from "./ssr.js";
import ApolloMiddleware from "../src/apollo/middleware";

const app = express();
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));

ApolloMiddleware(app);
app.use(express.static("build"));
ssr(app);

app.listen(3777);
