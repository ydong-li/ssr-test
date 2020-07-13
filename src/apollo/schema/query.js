import gql from 'graphql-tag';

export const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      ball
    }
  }
`;
