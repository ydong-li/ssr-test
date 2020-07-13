import React from "react";
import { graphql } from "react-apollo";
import { channelsListQuery } from "../apollo/schema/query";

const ChannelList = ({ data: { loading, error, channels } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <ul>
      {channels.map((ch) => (
        <li key={ch.id}>{ch.ball}</li>
      ))}
    </ul>
  );
};

export default graphql(channelsListQuery)(ChannelList);
