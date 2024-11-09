import { css } from "styled-components";
import type { RuleSet } from "styled-components/dist/types";

export const mixins = {
  box: (size: number) => css`
    width: ${size}px;
    aspect-ratio: 1;
  `,

  buttonReset: () => css`
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    cursor: pointer;
  `,

  linkReset: () => css`
    text-decoration: none;
    color: inherit;
  `,

  hover: (content: RuleSet) => css`
    @media (hover: hover) {
      &:hover {
        ${content}
      }
    }

    @media (hover: none) {
      &:active {
        ${content}
      }
    }
  `,
};
