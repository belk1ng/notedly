import {Query} from "./query.js";
import {Mutation} from "./mutation.js";
import { Note } from "./note.js";
import { User } from "./user.js";
import GraphQLISODate from "graphql-iso-date";

export const resolvers = {
    Query,
    Mutation,
    Note,
    User,
    DateTime: GraphQLISODate.GraphQLDateTime
}
