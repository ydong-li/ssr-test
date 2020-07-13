export default `
type Channel {
  id: ID!
  fruit: String
  ball: String
}
type Query {
  channels: [Channel]
}
`
