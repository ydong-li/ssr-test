import App from "./App";
import Child from "./child";
import foo from "./foo";

export default [
  // {
  //   path: "/",
  //   component: App,
  //   childRoutes: [
  //     {
  //       path: "b",
  //       component: foo,
  //     },
  //     {
  //       path: "c",
  //       component: Child,
  //     },
  //   ],
  // },
  {
    path: "/b",
    component: foo,
  },
  {
    path: "/c",
    component: Child,
  },

];
