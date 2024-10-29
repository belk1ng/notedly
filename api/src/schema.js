export const typeDefs = `#graphql
scalar DateTime

type User {
    id: ID!
    username: String!
    email: String!
    avatar: String

    notes: [Note!]!
    favoriteNotes: [Note!]!

    createdAt: DateTime!
    updatedAt: DateTime!
}

type Note {
    id: ID!
    content: String!
    author: User!

    favoriteCount: Int!
    favoriteBy: [User!]

    createdAt: DateTime!
    updatedAt: DateTime!
}

type Query {
    users: [User!]!
    user(username: String!): User
    me: User!

    notes: [Note!]!
    note(noteId: ID!): Note
}

type Mutation {
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!

    newNote(content: String!): Note!
    updateNote(noteId: ID!, content: String!): Note!
    deleteNote(noteId: ID!): Boolean!
    toggleFavorite(noteId: ID!): Note!
}
`
