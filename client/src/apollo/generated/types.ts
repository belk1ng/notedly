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


export type FavoriteNotesQuery = { __typename?: 'Query', me: { __typename?: 'User', favoriteNotes: Array<{ __typename?: 'Note', id: string, content: string, createdAt: any, author: { __typename?: 'User', username: string } }> } };

export type IsAuthenticatedQueryVariables = Exact<{ [key: string]: never; }>;


export type IsAuthenticatedQuery = { __typename?: 'Query', isAuthenticated: boolean, isInitialized: boolean };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string } };

export type MyNotesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyNotesQuery = { __typename?: 'Query', me: { __typename?: 'User', notes: Array<{ __typename?: 'Note', id: string, content: string, createdAt: any, author: { __typename?: 'User', username: string } }> } };

export type NavigationNoteFragment = { __typename?: 'Note', id: string, content: string, createdAt: any, author: { __typename?: 'User', username: string } };

export type NotesQueryVariables = Exact<{ [key: string]: never; }>;


export type NotesQuery = { __typename?: 'Query', notes: Array<{ __typename?: 'Note', id: string, content: string, favoriteCount: number, author: { __typename?: 'User', id: string, username: string, avatar?: string | null, notes: Array<{ __typename?: 'Note', id: string }> } }> };

export type NotesFeedQueryVariables = Exact<{
  cursor: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type NotesFeedQuery = { __typename?: 'Query', notesFeed: { __typename?: 'NotesFeed', hasNextPage: boolean, cursor?: string | null, notes: Array<{ __typename?: 'Note', id: string, content: string, createdAt: any, author: { __typename?: 'User', username: string } }> } };

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

export const NavigationNoteFragmentDoc = gql`
    fragment NavigationNote on Note {
  id
  content
  createdAt
  author {
    username
  }
}
    `;
export const FavoriteNotesDocument = gql`
    query FavoriteNotes {
  me {
    favoriteNotes {
      ...NavigationNote
    }
  }
}
    ${NavigationNoteFragmentDoc}`;

/**
 * __useFavoriteNotesQuery__
 *
 * To run a query within a React component, call `useFavoriteNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFavoriteNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFavoriteNotesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFavoriteNotesQuery(baseOptions?: Apollo.QueryHookOptions<FavoriteNotesQuery, FavoriteNotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FavoriteNotesQuery, FavoriteNotesQueryVariables>(FavoriteNotesDocument, options);
      }
export function useFavoriteNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FavoriteNotesQuery, FavoriteNotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FavoriteNotesQuery, FavoriteNotesQueryVariables>(FavoriteNotesDocument, options);
        }
export function useFavoriteNotesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FavoriteNotesQuery, FavoriteNotesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FavoriteNotesQuery, FavoriteNotesQueryVariables>(FavoriteNotesDocument, options);
        }
export type FavoriteNotesQueryHookResult = ReturnType<typeof useFavoriteNotesQuery>;
export type FavoriteNotesLazyQueryHookResult = ReturnType<typeof useFavoriteNotesLazyQuery>;
export type FavoriteNotesSuspenseQueryHookResult = ReturnType<typeof useFavoriteNotesSuspenseQuery>;
export type FavoriteNotesQueryResult = Apollo.QueryResult<FavoriteNotesQuery, FavoriteNotesQueryVariables>;
export const IsAuthenticatedDocument = gql`
    query IsAuthenticated {
  isAuthenticated @client
  isInitialized @client
}
    `;

/**
 * __useIsAuthenticatedQuery__
 *
 * To run a query within a React component, call `useIsAuthenticatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsAuthenticatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsAuthenticatedQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsAuthenticatedQuery(baseOptions?: Apollo.QueryHookOptions<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>(IsAuthenticatedDocument, options);
      }
export function useIsAuthenticatedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>(IsAuthenticatedDocument, options);
        }
export function useIsAuthenticatedSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>(IsAuthenticatedDocument, options);
        }
export type IsAuthenticatedQueryHookResult = ReturnType<typeof useIsAuthenticatedQuery>;
export type IsAuthenticatedLazyQueryHookResult = ReturnType<typeof useIsAuthenticatedLazyQuery>;
export type IsAuthenticatedSuspenseQueryHookResult = ReturnType<typeof useIsAuthenticatedSuspenseQuery>;
export type IsAuthenticatedQueryResult = Apollo.QueryResult<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    accessToken
    refreshToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MyNotesDocument = gql`
    query MyNotes {
  me {
    notes {
      ...NavigationNote
    }
  }
}
    ${NavigationNoteFragmentDoc}`;

/**
 * __useMyNotesQuery__
 *
 * To run a query within a React component, call `useMyNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyNotesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyNotesQuery(baseOptions?: Apollo.QueryHookOptions<MyNotesQuery, MyNotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyNotesQuery, MyNotesQueryVariables>(MyNotesDocument, options);
      }
export function useMyNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyNotesQuery, MyNotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyNotesQuery, MyNotesQueryVariables>(MyNotesDocument, options);
        }
export function useMyNotesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyNotesQuery, MyNotesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyNotesQuery, MyNotesQueryVariables>(MyNotesDocument, options);
        }
export type MyNotesQueryHookResult = ReturnType<typeof useMyNotesQuery>;
export type MyNotesLazyQueryHookResult = ReturnType<typeof useMyNotesLazyQuery>;
export type MyNotesSuspenseQueryHookResult = ReturnType<typeof useMyNotesSuspenseQuery>;
export type MyNotesQueryResult = Apollo.QueryResult<MyNotesQuery, MyNotesQueryVariables>;
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
      ...NavigationNote
    }
    hasNextPage
    cursor
  }
}
    ${NavigationNoteFragmentDoc}`;

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
export const RefreshTokensDocument = gql`
    mutation RefreshTokens($refreshToken: String!) {
  refreshTokens(refreshToken: $refreshToken) {
    accessToken
    refreshToken
  }
}
    `;
export type RefreshTokensMutationFn = Apollo.MutationFunction<RefreshTokensMutation, RefreshTokensMutationVariables>;

/**
 * __useRefreshTokensMutation__
 *
 * To run a mutation, you first call `useRefreshTokensMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokensMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokensMutation, { data, loading, error }] = useRefreshTokensMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshTokensMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokensMutation, RefreshTokensMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokensMutation, RefreshTokensMutationVariables>(RefreshTokensDocument, options);
      }
export type RefreshTokensMutationHookResult = ReturnType<typeof useRefreshTokensMutation>;
export type RefreshTokensMutationResult = Apollo.MutationResult<RefreshTokensMutation>;
export type RefreshTokensMutationOptions = Apollo.BaseMutationOptions<RefreshTokensMutation, RefreshTokensMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $email: String!) {
  register(username: $username, password: $password, email: $email) {
    accessToken
    refreshToken
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UserInfoDocument = gql`
    query UserInfo {
  me {
    id
    username
    avatar
  }
}
    `;

/**
 * __useUserInfoQuery__
 *
 * To run a query within a React component, call `useUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<UserInfoQuery, UserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, options);
      }
export function useUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserInfoQuery, UserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, options);
        }
export function useUserInfoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserInfoQuery, UserInfoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, options);
        }
export type UserInfoQueryHookResult = ReturnType<typeof useUserInfoQuery>;
export type UserInfoLazyQueryHookResult = ReturnType<typeof useUserInfoLazyQuery>;
export type UserInfoSuspenseQueryHookResult = ReturnType<typeof useUserInfoSuspenseQuery>;
export type UserInfoQueryResult = Apollo.QueryResult<UserInfoQuery, UserInfoQueryVariables>;