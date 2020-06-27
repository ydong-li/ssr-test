import clientRoutes from "../src/route";
const rp = require("request-promise-native");
const { renderToString } = require('react-dom/server');

clientRoutes.forEach(item => functionToString(item))
// console.log("clientRoutes: ", clientRoutes);

rp({
  uri: "http://localhost:3777/patchRoute",
  method: "POST",
  body: {
    data: clientRoutes,
  },
  json: true,
})
  .then(function (repos) {
    console.log("User has %d repos", repos);
  })
  .catch((e) => {
    console.log("error: ", e);
  });

function functionToString(obj) {
  if (obj.component) obj.component = obj.component.toString();
  if (obj.childRoutes)
    obj.childRoutes.forEach((child) => functionToString(child));
}
