export const typeDefs = `#graphql
scalar DateTime

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
    newNote(content: String!): Note!
    updateNote(noteId: ID!, content: String!): Note!
    deleteNote(noteId: ID!): Boolean!
}
`
