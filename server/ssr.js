import clientRoutes from "../src/route";
import React, { createElement } from "react";
import RenderUI from "./components/renderUI";
import { match as matchRoutes, RouterContext } from "react-router";
import { renderToString } from "react-dom/server";
import Foo from "../src/foo";
import apolloQuery from "./apolloQuery";
import createClient from "../src/apollo/client";
const path = require("path");
const fs = require("fs");

const client = createClient();

const template = fs.readFileSync(
  path.resolve(__dirname, "../build/index.html"),
  "utf8"
);

const isPageRequest = (req) => /text\/html/.test(req.headers.accept);

export default (app) => {
  console.log("x-web start");

  app.get("/content", (req, res) => {
    res.send(renderToString(<Foo />));
  });

  app.post("/patchRoute", (req, res) => {
    console.log("req is: ", req.body);
    clientRoutes = req.body.data;
    res.send("oker");
  });

  app.use(async function (req, res) {
    if (clientRoutes.length === 0) {
      res.end("ok2");
      return;
    }
    console.log("Accept: ", /text\/html/.test(req.headers.accept));
    if (isPageRequest(req)) {
      // console.log("clientRoutes: ", clientRoutes);
      const { path } = req;
      // console.log("path is ", path);
      matchRoutes(
        { routes: clientRoutes, location: path },
        async (error, redirect, renderProps) => {
          // console.log("renderProps", renderProps);
          if (error) {
            error();
          } else if (redirect) {
            res.redirect(302, redirect.pathname + redirect.search);
          } else if (renderProps) {
            let Component = createElement(RouterContext, renderProps);

            const componentContent = await apolloQuery(() => Component, client);
            const props = client.extract();

            // console.log("componentContent: ", componentContent);

            // console.log({ props });
            const mainContent = renderToString(
              <RenderUI content={componentContent} state={props} />
            );

            // console.log(mainContent);
            // res.end(mainContent);

            res.type("text/html");
            res.end(
              template.replace(/<div id="root"><\/div>/, `${mainContent}`)
            );
          } else {
            error();
          }
        }
      );
    }
  });
};
