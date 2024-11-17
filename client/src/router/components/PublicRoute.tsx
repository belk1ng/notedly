import { Navigate, Outlet } from "react-router-dom";
import { Typography } from "@/components";
import { useAuth } from "@/hooks";

export const PublicRoute = () => {
  const { isInitialized, isAuthenticated, hasError } = useAuth();

  if (!isInitialized) {
    return <Typography variant={"heading-1"}>Check auth...</Typography>;
  }

  if (hasError || !isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate replace to={"/home"} />;
};
