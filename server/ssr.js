import clientRoutes from "../src/route";
import React, { createElement } from "react";
import RenderUI from "./components/renderUI";
import { match as matchRoutes, RouterContext } from "react-router";
import { renderToString } from "react-dom/server";
import Foo from "../src/foo";
import apolloQuery from "./apolloQuery";
import createClient from "../src/apollo/client";
import { ApolloProvider } from "@apollo/react-common";
const path = require("path");
const fs = require("fs");

const client = createClient();

// global
// let clientRoutes = []

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

  app.use(async function (req, res, next) {
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
            // components 的第一个元素就是 layout 组件, 相当于 next.js 中 page
            // const Container = renderProps.components[0];
            // let props = Container.getInitialProps
            //   ? await Container.getInitialProps()
            //   : {};
            // renderProps.components[0] = (p) => {
            //   const initialProps = { ...p, ...props };
            //   return <Container {...initialProps} />;
            // };

            // console.log("renderProps", renderProps);

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
