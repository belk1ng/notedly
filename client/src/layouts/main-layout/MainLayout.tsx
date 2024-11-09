import { Outlet } from "react-router-dom";
import { StyledLayout, StyledLayoutContent } from "./styled";
import { Sidebar } from "./components";

export const MainLayout = () => {
  return (
    <StyledLayout>
      <Sidebar />
      <StyledLayoutContent>
        <Outlet />
      </StyledLayoutContent>
    </StyledLayout>
  );
};
