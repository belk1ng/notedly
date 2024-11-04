import { Outlet } from "react-router-dom";
import { StyledLayout } from "./styled";
import { Sidebar } from "./components";

export const MainLayout = () => {
  return (
    <StyledLayout>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </StyledLayout>
  );
};
