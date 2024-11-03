import express from "express";
import helmet from "helmet";
import http from 'http';
import cors from "cors";
import 'dotenv/config'
import {expressMiddleware} from '@apollo/server/express4';
import {ApolloServer} from "@apollo/server"
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import {createComplexityLimitRule} from 'graphql-validation-complexity';
import depthLimit from 'graphql-depth-limit'

import {models} from "./models/index.js"
import {resolvers} from "./resolvers/index.js";
import {readTypeDefs} from "./utils/readTypeDefs.js";
import RedisClient from "./services/RedisClient.js";
import {MongoClient} from "./services/MongoClient.js";
import TokenService from "./services/TokenService.js";

const PORT = Number(process.env.PORT) || 4000;

await new MongoClient(process.env.DB_HOST).connect()
await RedisClient.connect();

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs: readTypeDefs(),
    resolvers,
    validationRules: [
        createComplexityLimitRule(1000),
        depthLimit(5),
    ],
    plugins: [
        ApolloServerPluginDrainHttpServer({httpServer})
    ],
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
            try {
                const user = await TokenService.verifyAccessToken(token);

                return {
                    user,
                    models
                }

            } catch (error) {
                return {
                    models
                }
            }
        }
    })
)

await new Promise((resolve) =>
    httpServer.listen({port: PORT}, resolve),
);

console.log(`🚀 Server ready`);
