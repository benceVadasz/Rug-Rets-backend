import {ApolloServer, gql} from "apollo-server-express";
import express from 'express';
import mongoose from 'mongoose'
import cors from "cors";
import {resolvers} from "./resolvers";
import {typeDefs} from "./typeDefs";


const startServer = async () => {
    const app = express();
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({limit: "50mb", extended: true}))
    app.use(cors());

    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    server.applyMiddleware({app});

    await mongoose.connect("mongodb://localhost:27017/test3", {
        useNewUrlParser: true
    });

    app.listen({port: 4000}, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
};

startServer()
    .catch((e) => {
        console.log(e)
    })