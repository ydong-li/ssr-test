import App from "./App";
import Child from "./child";
import foo from "./foo";
import ClientWrapper from "./clientWrapper";

export default [
  {
    path: "/",
    exact: true,
    component: ClientWrapper(App),
    childRoutes: [
      {
        path: "b",
        component: foo,
      },
      // {
      //   path: "c",
      //   // exact: true,
      //   component: ClientWrapper(Child),
      // },
    ],
  },
  {
    path: "/c",
    component: ClientWrapper(Child),
  },
];
