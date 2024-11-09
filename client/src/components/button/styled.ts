import styled, { css } from "styled-components";
import type { StyledButtonProps } from "./Button.tsx";

export const StyledButton = styled.button<StyledButtonProps>`
  ${(props) => props.theme.mixins.buttonReset}

  width: ${(props) => (props.$fullWidth ? "100%" : "initial")};
  border: 1px solid;
  border-radius: 7px;
  padding: 6px 16px;

  &:not([disabled]) {
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
  }

  ${(props) => {
    switch (props.$variant) {
      case "filled":
        return css`
          background-color: ${props.theme.colors.main.accent};
          color: ${props.theme.colors.neutral.white};
          border-color: ${props.theme.colors.main.accent};

          ${props.theme.mixins.hover(css`
            background-color: ${props.theme.colors.main.hover};
            border-color: ${props.theme.colors.main.hover};
          `)}
        `;

      case "outlined":
        return css`
          color: ${props.theme.colors.neutral.primary};
          background-color: ${props.theme.colors.neutral.white};
          border-color: ${props.theme.colors.neutral["gray-3"]};

          ${props.theme.mixins.hover(css`
            background-color: ${props.theme.colors.neutral["gray-3"]};
          `)}
        `;
    }
  }}
`;
