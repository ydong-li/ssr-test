import React from 'react';
import { matchRoutes } from 'react-router-config';
const { renderToString } = require('react-dom/server');
import clientRoutes from '../src/route'
const path = require('path')
const fs = require("fs");
import App from '../src/App'

const Loading = () => {
  return <div>loading ...</div>
}

const template = fs.readFileSync(path.resolve(__dirname, '../build/index.html'), 'utf8')

export default app => {
  console.log(123)
  app.use(async function (req, res, next) {
    // console.log(req)
    // if (req.is('*/html')) {
    const { path } = req;
    const branch = matchRoutes(clientRoutes, path);
    //得到要渲染的组件
    const Component = branch[0].route.component;
    console.log(Component)
    const data = {}
    //将组件渲染为 html 字符串
    const componentContent = renderToString(Component ? <App><Component data={data} /></App> : <Loading />);


    res.end(template.replace(/<div id\=\"root\"><\/div>/,
      `<div id="root">${componentContent}</div>`
    ));
    // }
    next();
  })
};