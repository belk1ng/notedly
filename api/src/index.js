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

import {connectToDataBase} from "./mongo.js";
import {models} from "./models/index.js"
import {resolvers} from "./resolvers/index.js";
import {getUser} from "./utils/getUser.js";
import {readTypeDefs} from "./utils/readTypeDefs.js";
import {GraphQLError} from "graphql";
import {ErrorVariant} from "./constants/errors.js";

const PORT = Number(process.env.PORT) || 4000;

await connectToDataBase(process.env.DB_HOST)

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
                const user = await getUser(token);

                return {
                    user,
                    models
                }

            } catch (error) {
                throw new GraphQLError("", {
                    extensions: {
                        code: ErrorVariant.AuthenticationError,
                        http: {
                            status: 401,
                        }
                    }
                })
            }
        }
    })
)

await new Promise((resolve) =>
    httpServer.listen({port: PORT}, resolve),
);

console.log(`🚀 Server ready at http://localhost:${PORT}/api`);
