export const typeDefs = `#graphql
scalar DateTime

type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    notes: [Note!]!
}

type Note {
    id: ID!
    content: String!
    author: String!
    createdAt: DateTime!
    updatedAt: DateTime!
}

type Query {
    notes: [Note!]!
    note(noteId: ID!): Note
}

type Mutation {
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!
    
    newNote(content: String!): Note!
    updateNote(noteId: ID!, content: String!): Note!
    deleteNote(noteId: ID!): Boolean!
}
`
