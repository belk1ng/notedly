/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addNote: Note;
  deleteNote: Scalars['Boolean']['output'];
  login: AuthResponse;
  refreshTokens: AuthResponse;
  register: AuthResponse;
  toggleFavoriteNote: Note;
  updateNote: Note;
};


export type MutationAddNoteArgs = {
  content: Scalars['String']['input'];
};


export type MutationDeleteNoteArgs = {
  noteId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRefreshTokensArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationToggleFavoriteNoteArgs = {
  noteId: Scalars['ID']['input'];
};


export type MutationUpdateNoteArgs = {
  content: Scalars['String']['input'];
  noteId: Scalars['ID']['input'];
};

export type Note = {
  __typename?: 'Note';
  author: User;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  favoriteBy?: Maybe<Array<User>>;
  favoriteCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type NotesFeed = {
  __typename?: 'NotesFeed';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  notes: Array<Note>;
};

export type Query = {
  __typename?: 'Query';
  isAuthenticated: Scalars['Boolean']['output'];
  isInitialized: Scalars['Boolean']['output'];
  me: User;
  note?: Maybe<Note>;
  notes: Array<Note>;
  notesFeed: NotesFeed;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryNoteArgs = {
  noteId: Scalars['ID']['input'];
};


export type QueryNotesFeedArgs = {
  cursor: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  username: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  favoriteNotes: Array<Note>;
  id: Scalars['ID']['output'];
  notes: Array<Note>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type FavoriteNotesQueryVariables = Exact<{ [key: string]: never; }>;


export type FavoriteNotesQuery = { __typename?: 'Query', me: { __typename?: 'User', favoriteNotes: Array<(
      { __typename?: 'Note' }
      & { ' $fragmentRefs'?: { 'NavigationNoteFragment': NavigationNoteFragment } }
    )> } };

export type IsAuthenticatedQueryVariables = Exact<{ [key: string]: never; }>;


export type IsAuthenticatedQuery = { __typename?: 'Query', isAuthenticated: boolean, isInitialized: boolean };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string } };

export type MyNotesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyNotesQuery = { __typename?: 'Query', me: { __typename?: 'User', notes: Array<(
      { __typename?: 'Note' }
      & { ' $fragmentRefs'?: { 'NavigationNoteFragment': NavigationNoteFragment } }
    )> } };

export type NavigationNoteFragment = { __typename?: 'Note', id: string, content: string, createdAt: any, author: { __typename?: 'User', username: string } } & { ' $fragmentName'?: 'NavigationNoteFragment' };

export type NotesQueryVariables = Exact<{ [key: string]: never; }>;


export type NotesQuery = { __typename?: 'Query', notes: Array<{ __typename?: 'Note', id: string, content: string, favoriteCount: number, author: { __typename?: 'User', id: string, username: string, avatar?: string | null, notes: Array<{ __typename?: 'Note', id: string }> } }> };

export type NotesFeedQueryVariables = Exact<{
  cursor: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type NotesFeedQuery = { __typename?: 'Query', notesFeed: { __typename?: 'NotesFeed', hasNextPage: boolean, cursor?: string | null, notes: Array<(
      { __typename?: 'Note' }
      & { ' $fragmentRefs'?: { 'NavigationNoteFragment': NavigationNoteFragment } }
    )> } };

export type RefreshTokensMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshTokensMutation = { __typename?: 'Mutation', refreshTokens: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string } };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string } };

export type UserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type UserInfoQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, username: string, avatar?: string | null } };

export const NavigationNoteFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NavigationNote"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Note"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<NavigationNoteFragment, unknown>;
export const FavoriteNotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FavoriteNotes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"favoriteNotes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NavigationNote"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NavigationNote"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Note"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<FavoriteNotesQuery, FavoriteNotesQueryVariables>;
export const IsAuthenticatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsAuthenticated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isAuthenticated"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"client"}}]},{"kind":"Field","name":{"kind":"Name","value":"isInitialized"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"client"}}]}]}}]} as unknown as DocumentNode<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const MyNotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyNotes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NavigationNote"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NavigationNote"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Note"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<MyNotesQuery, MyNotesQueryVariables>;
export const NotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Notes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"favoriteCount"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"notes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<NotesQuery, NotesQueryVariables>;
export const NotesFeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NotesFeed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notesFeed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NavigationNote"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NavigationNote"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Note"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<NotesFeedQuery, NotesFeedQueryVariables>;
export const RefreshTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshTokens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<RefreshTokensMutation, RefreshTokensMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const UserInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]} as unknown as DocumentNode<UserInfoQuery, UserInfoQueryVariables>;