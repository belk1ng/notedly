import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
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

export type NotesQueryVariables = Exact<{ [key: string]: never; }>;


export type NotesQuery = { __typename?: 'Query', notes: Array<{ __typename?: 'Note', id: string, content: string, favoriteCount: number, author: { __typename?: 'User', id: string, username: string, avatar?: string | null, notes: Array<{ __typename?: 'Note', id: string }> } }> };

export type NotesFeedQueryVariables = Exact<{
  cursor: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type NotesFeedQuery = { __typename?: 'Query', notesFeed: { __typename?: 'NotesFeed', hasNextPage: boolean, cursor?: string | null, notes: Array<{ __typename?: 'Note', id: string, createdAt: any, content: string, author: { __typename?: 'User', username: string } }> } };


export const NotesDocument = gql`
    query Notes {
  notes {
    id
    content
    favoriteCount
    author {
      id
      username
      avatar
      notes {
        id
      }
    }
  }
}
    `;

/**
 * __useNotesQuery__
 *
 * To run a query within a React component, call `useNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotesQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotesQuery(baseOptions?: Apollo.QueryHookOptions<NotesQuery, NotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotesQuery, NotesQueryVariables>(NotesDocument, options);
      }
export function useNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotesQuery, NotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotesQuery, NotesQueryVariables>(NotesDocument, options);
        }
export function useNotesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<NotesQuery, NotesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NotesQuery, NotesQueryVariables>(NotesDocument, options);
        }
export type NotesQueryHookResult = ReturnType<typeof useNotesQuery>;
export type NotesLazyQueryHookResult = ReturnType<typeof useNotesLazyQuery>;
export type NotesSuspenseQueryHookResult = ReturnType<typeof useNotesSuspenseQuery>;
export type NotesQueryResult = Apollo.QueryResult<NotesQuery, NotesQueryVariables>;
export const NotesFeedDocument = gql`
    query NotesFeed($cursor: String!, $limit: Int) {
  notesFeed(cursor: $cursor, limit: $limit) {
    notes {
      id
      createdAt
      content
      author {
        username
      }
    }
    hasNextPage
    cursor
  }
}
    `;

/**
 * __useNotesFeedQuery__
 *
 * To run a query within a React component, call `useNotesFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotesFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotesFeedQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useNotesFeedQuery(baseOptions: Apollo.QueryHookOptions<NotesFeedQuery, NotesFeedQueryVariables> & ({ variables: NotesFeedQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotesFeedQuery, NotesFeedQueryVariables>(NotesFeedDocument, options);
      }
export function useNotesFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotesFeedQuery, NotesFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotesFeedQuery, NotesFeedQueryVariables>(NotesFeedDocument, options);
        }
export function useNotesFeedSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<NotesFeedQuery, NotesFeedQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NotesFeedQuery, NotesFeedQueryVariables>(NotesFeedDocument, options);
        }
export type NotesFeedQueryHookResult = ReturnType<typeof useNotesFeedQuery>;
export type NotesFeedLazyQueryHookResult = ReturnType<typeof useNotesFeedLazyQuery>;
export type NotesFeedSuspenseQueryHookResult = ReturnType<typeof useNotesFeedSuspenseQuery>;
export type NotesFeedQueryResult = Apollo.QueryResult<NotesFeedQuery, NotesFeedQueryVariables>;