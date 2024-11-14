import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { Typography } from "@/components";
import { useAuth } from "@/hooks";

export const ProtectedRoute = (props: PropsWithChildren) => {
  const { isLoading, isAuthenticated, hasError } = useAuth();

  if (isLoading) {
    return <Typography variant={"heading-1"}>Check auth...</Typography>;
  }

  if (hasError || !isAuthenticated) {
    return <Navigate replace to={"/auth"} />;
  }

  return props.children;
};
