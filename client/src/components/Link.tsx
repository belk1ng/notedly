import { NavLink, type LinkProps } from "react-router-dom";
import styled from "styled-components";
import { Typography } from "@/components/Typography.tsx";

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.neutral["gray-2"]};

  &:hover {
    color: ${(props) => props.theme.colors.neutral.primary};
  }

  &.active {
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${(props) => props.theme.colors.neutral.primary};

    &::before {
      content: "";
      width: 2px;
      height: 20px;
      background-color: ${(props) => props.theme.colors.main.accent};
    }
  }
`;

export const Link = ({ children, ...props }: LinkProps) => {
  return (
    <StyledLink {...props}>
      <Typography as="span" variant="body-large">
        {children}
      </Typography>
    </StyledLink>
  );
};
