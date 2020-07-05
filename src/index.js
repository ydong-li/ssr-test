import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from './App';
// import Child from './child'
import * as serviceWorker from "./serviceWorker";
import { Router, browserHistory } from "react-router";
import routeConfig from "./route";
import createClient from "./apollo/client";
import { ApolloProvider } from "react-apollo";

const render =
  typeof window === "undefined" ? ReactDOM.hydrate : ReactDOM.render;

console.log("xxx", routeConfig);
if (typeof PATCH_ROUTE !== "undefined") {
  window.PATCH_ROUTE(routeConfig);
}

// const client = createClient();
//
// render(
//   <ApolloProvider client={client}>
//     <Router routes={routeConfig} history={browserHistory} />
//   </ApolloProvider>,
//   document.getElementById("root")
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
