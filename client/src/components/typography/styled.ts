import styled, { css } from "styled-components";
import type { StyledProps } from "./Typography";

export const StyledTypography = styled.div<StyledProps>`
  ${(props) => {
    switch (props.$variant) {
      case "heading-1":
        return css`
          font-weight: 400;
          font-size: 26px;
          line-height: 31px;
        `;

      case "heading-2":
        return css`
          font-weight: 400;
          font-size: 20px;
          line-height: 24px;
        `;

      case "heading-3":
        return css`
          font-weight: 600;
          font-size: 16px;
          line-height: 27px;
        `;

      case "body-large":
        return css`
          font-weight: 400;
          font-size: 16px;
          line-height: 27px;
        `;

      case "body-small":
        return css`
          font-weight: 400;
          font-size: 13px;
          line-height: 20px;
        `;
    }
  }}
`;
