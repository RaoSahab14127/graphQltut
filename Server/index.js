import express, { query } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4"
import cors from "cors"
import axios from "axios"
import bodyParser from "body-parser";
async function startServer(){
    const app = express()
    const server = new ApolloServer({
        typeDefs:`
        type User {
            id: ID!
            name: String!
            username: String!
            email: String!
            phone: String!
            website: String!
        }
        type Todo {
            userId: ID!
            id: ID!
            title: String!
            user: User
            completed: Boolean
        }

        type Query {
            getTodos: [Todo]
        }

    `,
        resolvers:{
            Todo: {
                user:async(x)=>(await axios.get(`https://jsonplaceholder.typicode.com/users/${x.userId}`)).data
            }
                
            ,
            Query :{
                getTodos: async()=>(await axios.get('https://jsonplaceholder.typicode.com/todos/')).data,
                
            }
        }
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