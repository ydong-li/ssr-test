import React from "react";
import { getDataFromTree, renderToStringWithData} from "@apollo/react-ssr";
// const { renderToStringWithData } = require('react-apollo/server');
import { ApolloProvider } from "react-apollo";

export default async (Component, client) => {


  // console.log("client", client);
  const res = await renderToStringWithData(
    <ApolloProvider client={client}>
      <Component />
    </ApolloProvider>
  );
  console.log("res is: ", res);
  return {};
};
