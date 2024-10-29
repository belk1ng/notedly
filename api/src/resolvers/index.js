import {Query} from "./query.js";
import {Mutation} from "./mutation.js";
import GraphQLISODate from "graphql-iso-date";

export const resolvers = {
    Query,
    Mutation,
    DateTime: GraphQLISODate.GraphQLDateTime
}
