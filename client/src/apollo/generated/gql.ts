/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "query FavoriteNotes {\n  me {\n    favoriteNotes {\n      ...NavigationNote\n    }\n  }\n}": types.FavoriteNotesDocument,
    "query IsAuthenticated {\n  isAuthenticated @client\n  isInitialized @client\n}": types.IsAuthenticatedDocument,
    "mutation Login($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    accessToken\n    refreshToken\n  }\n}": types.LoginDocument,
    "query MyNotes {\n  me {\n    notes {\n      ...NavigationNote\n    }\n  }\n}": types.MyNotesDocument,
    "fragment NavigationNote on Note {\n  id\n  content\n  createdAt\n  author {\n    username\n  }\n}": types.NavigationNoteFragmentDoc,
    "query Notes {\n  notes {\n    id\n    content\n    favoriteCount\n    author {\n      id\n      username\n      avatar\n      notes {\n        id\n      }\n    }\n  }\n}": types.NotesDocument,
    "query NotesFeed($cursor: String!, $limit: Int) {\n  notesFeed(cursor: $cursor, limit: $limit) {\n    notes {\n      ...NavigationNote\n    }\n    hasNextPage\n    cursor\n  }\n}": types.NotesFeedDocument,
    "mutation RefreshTokens($refreshToken: String!) {\n  refreshTokens(refreshToken: $refreshToken) {\n    accessToken\n    refreshToken\n  }\n}": types.RefreshTokensDocument,
    "mutation Register($username: String!, $password: String!, $email: String!) {\n  register(username: $username, password: $password, email: $email) {\n    accessToken\n    refreshToken\n  }\n}": types.RegisterDocument,
    "query UserInfo {\n  me {\n    id\n    username\n    avatar\n  }\n}": types.UserInfoDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query FavoriteNotes {\n  me {\n    favoriteNotes {\n      ...NavigationNote\n    }\n  }\n}"): (typeof documents)["query FavoriteNotes {\n  me {\n    favoriteNotes {\n      ...NavigationNote\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query IsAuthenticated {\n  isAuthenticated @client\n  isInitialized @client\n}"): (typeof documents)["query IsAuthenticated {\n  isAuthenticated @client\n  isInitialized @client\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation Login($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    accessToken\n    refreshToken\n  }\n}"): (typeof documents)["mutation Login($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    accessToken\n    refreshToken\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query MyNotes {\n  me {\n    notes {\n      ...NavigationNote\n    }\n  }\n}"): (typeof documents)["query MyNotes {\n  me {\n    notes {\n      ...NavigationNote\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment NavigationNote on Note {\n  id\n  content\n  createdAt\n  author {\n    username\n  }\n}"): (typeof documents)["fragment NavigationNote on Note {\n  id\n  content\n  createdAt\n  author {\n    username\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query Notes {\n  notes {\n    id\n    content\n    favoriteCount\n    author {\n      id\n      username\n      avatar\n      notes {\n        id\n      }\n    }\n  }\n}"): (typeof documents)["query Notes {\n  notes {\n    id\n    content\n    favoriteCount\n    author {\n      id\n      username\n      avatar\n      notes {\n        id\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query NotesFeed($cursor: String!, $limit: Int) {\n  notesFeed(cursor: $cursor, limit: $limit) {\n    notes {\n      ...NavigationNote\n    }\n    hasNextPage\n    cursor\n  }\n}"): (typeof documents)["query NotesFeed($cursor: String!, $limit: Int) {\n  notesFeed(cursor: $cursor, limit: $limit) {\n    notes {\n      ...NavigationNote\n    }\n    hasNextPage\n    cursor\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation RefreshTokens($refreshToken: String!) {\n  refreshTokens(refreshToken: $refreshToken) {\n    accessToken\n    refreshToken\n  }\n}"): (typeof documents)["mutation RefreshTokens($refreshToken: String!) {\n  refreshTokens(refreshToken: $refreshToken) {\n    accessToken\n    refreshToken\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation Register($username: String!, $password: String!, $email: String!) {\n  register(username: $username, password: $password, email: $email) {\n    accessToken\n    refreshToken\n  }\n}"): (typeof documents)["mutation Register($username: String!, $password: String!, $email: String!) {\n  register(username: $username, password: $password, email: $email) {\n    accessToken\n    refreshToken\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query UserInfo {\n  me {\n    id\n    username\n    avatar\n  }\n}"): (typeof documents)["query UserInfo {\n  me {\n    id\n    username\n    avatar\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;