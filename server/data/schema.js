import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import resolvers from './resolvers'
import mocks from './mocks'

const typeDefs = `
type Query {
  user: User
  sports(limit: Int): [Sport]
  sportMatches(sportName: String): [Match]
}

type User {
  id: Int
  firstName: String
  lastName: String
  email: String
  password: String
  jwt: String
}

type Sport {
  id: Int
  name: String
  matches: [Match]
}

type Match {
  id: String
  homeTeam: String
  awayTeam: String
  sport: Sport
}

type Mutation {
  login(email: String!, password: String!): User
  signup(email: String!, password: String!): User
}
`

const schema = makeExecutableSchema({ typeDefs, resolvers })

// addMockFunctionsToSchema({ schema, mocks })

export default schema
