import clientRoutes from "../src/route";
import React, { createElement } from "react";
import RenderUI from "./components/renderUI";
import { match as matchRoutes, RouterContext } from "react-router";
import { renderToString } from "react-dom/server";
import Foo from "../src/foo";
import apolloQuery from "./apolloQuery";
import createClient from "../src/apollo/client";
import template from "./manifest";

// console.log('template;\n', template);

const client = createClient();

const isPageRequest = (req) => /text\/html/.test(req.headers.accept);

export default (app) => {
  console.log("x-web start");

  app.get("/xWebContent", (req, res) => {
    serverRender(req.query.path, res);
  });

  app.use(async function (req, res) {
    if (clientRoutes.length === 0) {
      res.end("ok2");
      return;
    }
    console.log("Accept: ", /text\/html/.test(req.headers.accept));
    if (isPageRequest(req)) {
      serverRender(req.path, res);
    }
  });
};

function serverRender(path, res) {
  // console.log("clientRoutes: ", clientRoutes);
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
          <div id="x-web">
            <RenderUI content={componentContent} state={props} />
          </div>
        );

        // console.log(mainContent);
        // res.end(mainContent);

        res.type("text/html");
        res.end(`
              ${mainContent}
              ${template}
            `);
        // res.end(
        //   template.replace(/<div id="root"><\/div>/, `${mainContent}`)
        // );
      } else {
        error();
      }
    }
  );
}
