import React from "react";
import { getDataFromTree } from "@apollo/react-ssr";
import createClient from "../src/apollo/client";
import { ApolloProvider } from "react-apollo";

const client = createClient();

export default async (Component) => {
  await getDataFromTree(ApolloWrapper({ Component }));
  return client.extract();
};

function ApolloWrapper({Component}) {
  return <ApolloProvider client={client}>
    <Component />
  </ApolloProvider>
}
