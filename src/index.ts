import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

async function init(){
    
const PORT = Number(process.env.PORT) || 8000;
const app =express()

app.use(express.json());

//create GraphQL server

const gqlServer = new ApolloServer({
    typeDefs:`type Query {
        hello: String
        say(name:String):String
    }`,    // Schema
    resolvers : {
        Query:{
            hello:()=> 'Hello World! I am graphQL Server',
            say: (_,{name}:{name:string}) => `Hey ${name} how are you?`
        },
    }  // Actual function that will be executed
});

await gqlServer.start()


app.get("/",(req,res)=>{
    res.json({messag: "Server is up and running"});
});

app.use('/graphql',expressMiddleware(gqlServer))

app.listen(PORT,()=> console.log(`Server started at Port:${PORT}`))
}

init()