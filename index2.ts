import {ApolloServer, gql} from "apollo-server-express";
// import {typeDefs, resolvers} from './graphql'
import * as express from 'express';
import * as mongoose from 'mongoose'

const app = express()

const typeDefs = gql`
    type Query {
        hello: String!
    }
`

const resolvers = {
    Query: {
        hello: () => "Hello"
    }
}

const server = new ApolloServer({
    // typeDefs,
    // resolvers
})

server.applyMiddleware({app});

app.listen({port: 4000}, () => {
    console.log(`Server running on port ${server.graphqlPath}`)
})