const channels = [
  {
    id: 1,
    fruit: 'apple',
    ball: "soccer",
  },
  {
    id: 2,
    fruit: 'mango',
    ball: "baseball",
  },
];

export default {
  Query: {
    channels: () => {
      return channels;
    },
  },
};
