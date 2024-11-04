import { Link } from "@/components";
import { StyledNav, StyledNavList } from "./styled";
import { navConfig } from "./config";

export const Navigation = () => {
  return (
    <StyledNav>
      <StyledNavList>
        {navConfig.map((item) => (
          <li key={item.path}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </StyledNavList>
    </StyledNav>
  );
};
