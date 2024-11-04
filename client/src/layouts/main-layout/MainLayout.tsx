import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Typography } from "@/components";
import { Navigation } from "./Navigation";

const StyledLayout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 1fr;
`;

const StyledAside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 40px;

  padding: 40px 24px;
  background-color: ${(props) => props.theme.colors.neutral["gray-4"]};
  border-right: 1px solid ${(props) => props.theme.colors.neutral["gray-3"]};
`;

const StyledAsideHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 5px;

  color: ${(props) => props.theme.colors.main.accent};
`;

const MainLayout = () => {
  return (
    <StyledLayout>
      <StyledAside>
        <StyledAsideHeader>
          <Typography variant="heading-3" as="h1">
            Notedly
          </Typography>
        </StyledAsideHeader>
        <main>
          <Navigation />
        </main>
      </StyledAside>

      <main>
        <Outlet />
      </main>
    </StyledLayout>
  );
};

export default MainLayout;
