import React from "react";
import App from "./App";
import Child from "./child";
import foo from "./foo";
import ClientRender from "./clientRender";
// import Loadable from "react-loadable";

// const Loading = () => <p>Loading ...</p>;

export default [
  {
    path: "/",
    component: function XWeb() {
      return <App />;
    },
    childRoutes: [
      {
        path: "b",
        component: foo,
      },
      {
        path: "c",
        // exact: true,
        component: Child,
      },
    ],
  },
  // {
  //   path: "/c",
  //   component: ClientRender(Child),
  // },
];
