import styled from "styled-components";
import { Link } from "@/components";

const StyledNav = styled.nav`
  height: 100%;
`;

const StyledNavList = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
`;

export const Navigation = () => {
  return (
    <StyledNav>
      <StyledNavList>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/notes">Notes</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
      </StyledNavList>
    </StyledNav>
  );
};
