import { Query } from "./query.js";
import { Mutation } from "./mutation.js";
import { Note } from "./entities/note.js";
import { User } from "./entities/user.js";
import GraphQLISODate from "graphql-iso-date";

export const resolvers = {
  Query,
  Mutation,
  Note,
  User,
  DateTime: GraphQLISODate.GraphQLDateTime,
};
