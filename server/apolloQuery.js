import React from "react";
import { renderToStringWithData } from "@apollo/react-ssr";
import { ApolloProvider } from "react-apollo";

export default async (Component, client) => {
  return await renderToStringWithData(
    <ApolloProvider client={client}>
      <Component />
    </ApolloProvider>
  );
};
