export default `
type Channel {
  id: ID!
  name: String
}
type Query {
  channels: [Channel]    # "[]" 意味着这是频道列表
}
`
