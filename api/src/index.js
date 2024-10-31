import express from "express";
import helmet from "helmet";
import http from 'http';
import cors from "cors";
import {expressMiddleware} from '@apollo/server/express4';
import {ApolloServer} from "@apollo/server"
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import {connectToDataBase} from "./mongo.js";
import {resolvers} from "./resolvers/index.js";
import {typeDefs} from "./schema.js"
import {models} from "./models/index.js"
import {getUser} from "./utils/getUser.js";
import 'dotenv/config'

const PORT = Number(process.env.PORT) || 4000;

await connectToDataBase(process.env.DB_HOST)

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginDrainHttpServer({httpServer})
    ]
})

await server.start();

app.use('/api',
    express.json(),
    cors(),
    helmet({
        contentSecurityPolicy: {
            directives: {
                imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
                scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
                manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
                frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
            },
        },
    }),
    expressMiddleware(server, {
        context: async ({req}) => {
            const token = req.headers.authorization;
            const user = await getUser(token);

            return {
                user,
                models
            }
        }
    }))

await new Promise((resolve) =>
    httpServer.listen({port: PORT}, resolve),
);
console.log(`🚀 Server ready at http://localhost:${PORT}/api`);
