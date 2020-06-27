// import clientRoutes from "../src/route";
import React from "react";
import { matchRoutes } from "react-router-config";
import { renderToString } from "react-dom/server";
const path = require("path");
const fs = require("fs");
import Foo from '../src/foo'

// global
let clientRoutes = []

const template = fs.readFileSync(
  path.resolve(__dirname, "../build/index.html"),
  "utf8"
);

const isPageRequest = (req) => /text\/html/.test(req.headers.accept);

export default (app) => {
  console.log(123);

  app.get('/content', (req, res) => {
    res.send(renderToString(<Foo />))
  })

  app.post("/patchRoute", (req, res) => {
    console.log("req is: ", req.body);
    clientRoutes = req.body.data;
    res.send("oker");
  });

  app.use(async function (req, res, next) {
    if (clientRoutes.length === 0) {
      res.end("ok2");
      return;
    }
    console.log("Accept: ", /text\/html/.test(req.headers.accept));
    if (isPageRequest(req)) {
      console.log("clientRoutes: ", clientRoutes);
      const { path } = req;
      console.log("path is ", path);
      // const branch = matchRoutes(clientRoutes, path);
      // console.log(branch);
      // //得到要渲染的组件
      // console.log(branch[0]);
      const Component = clientRoutes[0].component;
      var RenderFunction
      // const componentFunString = Component.replace(/function\s*\(/, 'function RenderFunction (')
      const componentFunString = `RenderFunction = ${Component}`
      console.log(componentFunString)
      eval(componentFunString)
      //将组件渲染为 html 字符串
      try {
        console.log(RenderFunction)
        const componentContent = renderToString(<RenderFunction />);
        console.log(componentContent);

        res.end(componentContent);
      } catch (e) {
        console.warn(e);
      }

      // res.end(
      //   template.replace(
      //     /<div id="root"><\/div>/,
      //     `<div id="root">${componentContent}</div>`
      //   )
      // );
    }
    next();
  });
};
