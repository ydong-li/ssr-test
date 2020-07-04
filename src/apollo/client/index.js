// 创建 Apollo client
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

const isServer = typeof window === "undefined";

const createClient = () =>
  new ApolloClient({
    ssrMode: true,
    /**
     * 需要配置 credentials, controller/graphql 的 post 方法才能直接请求 http://localhost:8000/grapql
     */
    link: createHttpLink({
      uri: "http://localhost:3777/api/graphql",
      // credentials: "same-origin",
      fetch: isServer ? require("node-fetch") : fetch,
    }),
    cache: isServer
      ? new InMemoryCache()
      : new InMemoryCache().restore(window.__INITIAL_STATE__ || {}),
  });

export default createClient;
