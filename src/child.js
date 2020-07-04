import React, { useState } from "react";
import { timeoutPromise } from "./utils";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const QUERY = gql`
  query channles {
    channels {
      id
      fruit
    }
  }
`;

export default function Child({ InitialNum, InitialMsg }) {
  const [num, setNum] = useState(InitialNum || 7);
  const [msg, setMsg] = useState(InitialMsg || "empty");

  return (
    <Query query={QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading... ...</p>;
        if (error) console.warn(error);
        return (
          <div>
            <h2>Child Component</h2>
            <button onClick={() => setNum(num + 1)}>add</button>
            <p>Number: {num}</p>
            <p>{data && data.channels[0].fruit}</p>
          </div>
        );
      }}
    </Query>
  );
}

// Child.displayName = "Child";
//
// Child.getInitialProps = async () => {
//   return await timeoutPromise(() => {
//     const InitialNum = typeof window === "undefined" ? 1 : 0;
//     const InitialMsg = typeof window === "undefined" ? "server" : "client";
//     return { InitialNum, InitialMsg };
//   }, 30);
// };
