import type { PropsWithChildren, ReactNode } from "react";
import type { QueryResult as ApolloQueryResult } from "@apollo/client";
import { Typography } from "@/components";
import { useThrowAsyncError } from "@/hooks";

type BaseQueryResultProps = Pick<
  ApolloQueryResult,
  "data" | "loading" | "error"
>;

export interface QueryResultProps
  extends PropsWithChildren<BaseQueryResultProps> {
  useBoundary?: boolean;
  loadingFallback?: ReactNode;
}

export const QueryResult = ({
  error,
  useBoundary = false,
  loading,
  loadingFallback,
  data,
  children,
}: QueryResultProps) => {
  const throwAsyncError = useThrowAsyncError();

  if (error) {
    if (useBoundary) {
      throwAsyncError(error);
    } else {
      return <p>Error: {error.message}</p>;
    }
  }

  if (loading) {
    return loadingFallback ?? <p>Loading...</p>;
  }

  if (data) {
    return children;
  }

  return <Typography component={"span"}>Nothing to show...</Typography>;
};
