import { GraphQLError } from "graphql";

const ErrorCode = {
  AuthenticationError: "UNAUTHENTICATED",
  ForbiddenError: "FORBIDDEN",
  UnexpectedError: "UNEXPECTED",
  NotFoundError: "NOT_FOUND",
};

const ErrorStatus = {
  AuthenticationError: 401,
  ForbiddenError: 403,
  UnexpectedError: 500,
  NotFoundError: 404,
};

export class GraphQLAuthenticationError extends GraphQLError {
  constructor(message) {
    super(message);

    this.extensions = {
      code: ErrorCode.AuthenticationError,
      http: {
        status: ErrorStatus.AuthenticationError,
      },
    };
  }
}

export class GraphQLForbiddenError extends GraphQLError {
  constructor(message) {
    super(message);

    this.extensions = {
      code: ErrorCode.ForbiddenError,
      http: {
        status: ErrorStatus.ForbiddenError,
      },
    };
  }
}

export class GraphQLUnexpectedError extends GraphQLError {
  constructor(message) {
    super(message);

    this.extensions = {
      code: ErrorCode.UnexpectedError,
      http: {
        status: ErrorStatus.UnexpectedError,
      },
    };
  }
}

export class GraphQLNotFoundError extends GraphQLError {
  constructor(message) {
    super(message);

    this.extensions = {
      code: ErrorCode.NotFoundError,
      http: {
        status: ErrorStatus.NotFoundError,
      },
    };
  }
}
