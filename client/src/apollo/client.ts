import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import {
  RefreshTokensDocument,
  type RefreshTokensMutation,
} from "@/apollo/generated/types";
import { AuthService } from "./services";

/**
 * Create the HTTP link to the GraphQL API.
 */
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URI,
});

/**
 * Create an authentication link that sets the Authorization header
 * with the access token.
 *
 * @param {function} refreshTokensMutation - A function to send mutation which updates tokens.
 * @returns {ApolloLink} The authentication link.
 */
const createAuthLink = (refreshTokensMutation: () => Promise<void>) => {
  const authLink = setContext((_, prevContext) => {
    const accessToken = AuthService.accessToken;

    return {
      ...prevContext,
      headers: {
        ...prevContext?.headers,
        Authorization: accessToken,
      },
    };
  });

  /**
   * Error link to handle authentication errors and refresh tokens.
   */
  const errorLink = [
    onError(({ graphQLErrors, operation, forward }) => {
      if (!graphQLErrors) {
        return;
      }

      for (const { path, extensions } of graphQLErrors) {
        if (extensions?.code !== "UNAUTHENTICATED" || !path) {
          continue;
        }

        if (path.includes("refreshTokens")) {
          break;
        }

        const { getContext, setContext } = operation;
        const ctx = getContext();

        setContext({
          ...ctx,
          headers: {
            ...ctx?.headers,
            _needsRefresh: true,
          },
        });

        return forward(operation);
      }
    }),

    setContext(async (_, prevContext) => {
      if (prevContext?.headers?._needsRefresh) {
        await refreshTokensMutation();
      }

      return prevContext;
    }),
  ];

  return [...errorLink, authLink];
};

/**
 * Function to update the access and refresh tokens.
 */
const updateTokens = async () => {
  const refreshToken = AuthService.refreshToken;

  try {
    const response = await client.mutate<RefreshTokensMutation>({
      mutation: RefreshTokensDocument,
      variables: {
        refreshToken,
      },
    });

    AuthService.clearTokens();

    if (response.data?.refreshTokens) {
      AuthService.updateTokens({
        accessToken: response.data.refreshTokens.accessToken,
        refreshToken: response.data.refreshTokens.refreshToken,
      });
    }
  } catch (error) {
    console.log("Error while refreshing tokens", error);
    AuthService.logout();
    throw error;
  }
};

/**
 * Create the Apollo Client instance with the authentication link and HTTP link.
 */
export const client = new ApolloClient({
  link: from([...createAuthLink(updateTokens), httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isInitialized: {
            read() {
              return AuthService.isInitialized;
            },
          },
          isAuthenticated: {
            read() {
              return AuthService.isAuthenticated;
            },
          },
        },
      },
    },
  }),
  defaultOptions: { watchQuery: { fetchPolicy: "cache-and-network" } },
  devtools: {
    enabled: true,
  },
});
