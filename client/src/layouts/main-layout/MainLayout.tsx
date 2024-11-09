import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "@/components";
import { StyledLayout, StyledLayoutContent } from "./styled";
import { Sidebar } from "./components";

export const MainLayout = () => {
  return (
    <StyledLayout>
      <Sidebar />
      <StyledLayoutContent>
        <ErrorBoundary>
          <Suspense fallback={<p>Loading...</p>}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </StyledLayoutContent>
    </StyledLayout>
  );
};
