import App from "./App";
import Child from "./child";
import foo from "./foo";
import ClientRender from "./clientRender";

export default [
  // {
  //   component: App,
  //   routes: [
  //     {
  //       path: "/",
  //       component: App,
  //       exact: true,
  //       routes: [
  //         {
  //           path: "/b",
  //           component: ClientRender(foo),
  //         },
  //         {
  //           path: "/c",
  //           component: ClientRender(Child),
  //         },
  //       ]
  //     },
  //   ],
  // },
  {
    path: "/",
    component: App,
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
