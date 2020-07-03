// 创建 Apollo client
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import axios from "axios";

const isServer = typeof window === "undefined";

const createClient = () =>
  new ApolloClient({
    ssrMode: true,
    /**
     * 需要配置 credentials, controller/graphql 的 post 方法才能直接请求 http://localhost:8000/grapql
     */
    link: createHttpLink({
      uri: "http://localhost:3777/gql",
      credentials: "same-origin",
      fetch: axios,
      headers: {
        "Content-Type": "application/json",
      },
    }),
    cache: isServer
      ? new InMemoryCache()
      : new InMemoryCache().restore(window.__INITIAL_STATE__ || {}),
  });

export default createClient;
