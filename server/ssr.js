import clientRoutes from "../src/route";
import React, { createElement } from "react";
import RenderUI from "./components/renderUI";
import { match as matchRoutes, RouterContext } from "react-router";
import { renderToString } from "react-dom/server";
import Foo from "../src/foo";
const path = require("path");
const fs = require("fs");

// global
// let clientRoutes = []

const template = fs.readFileSync(
  path.resolve(__dirname, "../build/index.html"),
  "utf8"
);

const isPageRequest = (req) => /text\/html/.test(req.headers.accept);

export default (app) => {
  console.log("x-web start");

  // 提供给 m-web 的接口
  app.get("/content", (req, res) => {
    res.send(renderToString(<Foo />));
  });

  app.post("/patchRoute", (req, res) => {
    console.log("req is: ", req.body);
    clientRoutes = req.body.data;
    res.send("oker");
  });

  app.use(async function (req, res) {
    // 判断首屏请求
    if (/text\/html/.test(req.headers.accept)) {
      const { path } = req;
      // 路由匹配组件
      matchRoutes(
        { routes: clientRoutes, location: path },
        async (error, redirect, ssrData) => {
          if (error) {
            error();
          } else if (redirect) {
            res.redirect(302, redirect.pathname + redirect.search);
          } else if (ssrData) {
            // components 的第一个元素就是当前页面最外层的组件, 在服务端调用此组件的网络请求方法
            // 以便输出有效内容
            const Container = ssrData.components[0];
            // getInitialProps--自定义的获取数据方法
            let initialProps = Container.getInitialProps
              ? await Container.getInitialProps()
              : {};
            // 用一个高阶组件把接口返回的数据作为 props 传入页面最外层组件
            ssrData.components[0] = (p) => {
              const props = { ...p, ...initialProps };
              return <Container {...props} />;
            };
            // 输出有效内容的 html 字符串
            let Component = createElement(RouterContext, ssrData);
            const componentContent = renderToString(Component);
            // RenderUI为自定义组件, 用于处理客户端注水逻辑
            const mainContent = renderToString(
              <RenderUI
                content={componentContent}
                initialProps={initialProps}
              />
            );
            console.log(mainContent);
            // 将内容返回给浏览器
            res.type("html");
            res.end(
              template.replace(
                /<div id="root"><\/div>/,
                `<div id="root">${mainContent}</div>`
              )
            );
          } else {
            error();
          }
        }
      );
    }
  });
};
