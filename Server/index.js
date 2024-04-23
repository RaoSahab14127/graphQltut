import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4"
import cors from "cors"
import axios from "axios"
import bodyParser from "body-parser";
async function startServer(){
    const app = express()
    const server = new ApolloServer({
        typeDefs:`
        type Todo {
            id: ID!
            title: String!
            completed: Boolean
        }

        type Query {
            getTodos: [Todo]
        }

    `,
        resolvers:{}
    })

    app.use(bodyParser.json())
    app.use(cors())

    await server.start()

    app.use("/graphql", expressMiddleware(server))

    app.listen(8000, ()=>{
        console.log("Started")
    })

} 
startServer();