import React, { useState } from "react";
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

export default function Child() {
  const [num, setNum] = useState(7);

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
