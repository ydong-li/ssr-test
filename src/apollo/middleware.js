// Copyright 2018 caicloud authors. All rights reserved.
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schema/types";
import resolvers from "./schema/resolvers";

export default (app) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  server.applyMiddleware({
    app,
    path: '/gql',
  });
};
