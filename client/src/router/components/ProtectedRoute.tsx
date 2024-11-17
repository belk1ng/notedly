import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { Typography } from "@/components";
import { useAuth } from "@/hooks";

export const ProtectedRoute = (props: PropsWithChildren) => {
  const { isInitialized, isAuthenticated, hasError } = useAuth();

  if (!isInitialized) {
    return <Typography variant={"heading-1"}>Check auth...</Typography>;
  }

  if (hasError || !isAuthenticated) {
    return <Navigate replace to={"/auth"} />;
  }

  return props.children;
};
