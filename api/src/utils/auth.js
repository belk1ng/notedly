import { GraphQLAuthenticationError } from "../constants/errors.js";

export const authenticate = (resolver) => {
  return async (parent, args, context) => {
    if (!context.user) {
      throw new GraphQLAuthenticationError("You must be signed in");
    }

    return resolver(parent, args, context);
  };
};
