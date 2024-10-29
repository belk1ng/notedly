import {ApolloServer} from "@apollo/server"
import {startStandaloneServer} from "@apollo/server/standalone";
import {connectToDataBase} from "./mongo.js";
import {resolvers} from "./resolvers/index.js";
import {typeDefs} from "./schema.js"
import {models} from "./models/index.js"
import 'dotenv/config'
import {getUser} from "./utils/getUser.js";

const port = process.env.PORT ?? 4000;
const DB_HOST = process.env.DB_HOST;

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

await connectToDataBase(DB_HOST)

const {url} = await startStandaloneServer(server, {
    listen: {
        port
    },
    context: async ({req}) => {
        const token = req.headers.authorization;
        const user = await getUser(token);

        return {
            user,
            models
        }
    }
})

console.log(`🚀 Server ready at: ${url}`);
