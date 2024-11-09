import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";

export const StyledLink = styled(NavLink)`
  ${(props) => props.theme.mixins.linkReset}

  color: ${(props) => props.theme.colors.neutral["gray-2"]};

  ${(props) =>
    props.theme.mixins.hover(css`
      color: ${props.theme.colors.neutral.primary};
    `)}

  &.active {
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${(props) => props.theme.colors.neutral.primary};

    &::before {
      content: "";
      width: 2px;
      height: 20px;
      border-radius: 20px;
      background-color: ${(props) => props.theme.colors.main.accent};
    }
  }
`;
