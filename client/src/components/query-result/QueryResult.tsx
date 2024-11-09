import type { PropsWithChildren } from "react";
import type { QueryResult as ApolloQueryResult } from "@apollo/client";
import { Typography } from "@/components";

type BaseQueryResultProps = Pick<
  ApolloQueryResult,
  "data" | "loading" | "error"
>;

export interface QueryResultProps
  extends PropsWithChildren<BaseQueryResultProps> {}

export const QueryResult = ({
  error,
  loading,
  data,
  children,
}: QueryResultProps) => {
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (data) {
    return children;
  }

  return <Typography component={"span"}>Nothing to show...</Typography>;
};
