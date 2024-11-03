import type { ComponentPropsWithoutRef } from "react";
import styled, { css } from "styled-components";

export type TypographyVariant =
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "body-large"
  | "body-small";

export type TypographyPolymorphic =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "span"
  | "p"
  | "strong"
  | "em"
  | "blockquote"
  | "q"
  | "code"
  | "pre";

type Props<As extends TypographyPolymorphic> = {
  as?: As;
  variant?: TypographyVariant;
} & ComponentPropsWithoutRef<As>;

const StyledTypography = styled.div<{ $variant: TypographyVariant }>`
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

export const Typography = <As extends TypographyPolymorphic>({
  as,
  variant = "body-large",
  ...props
}: Props<As>) => {
  const map: Record<TypographyVariant, TypographyPolymorphic> = {
    "heading-1": "h1",
    "heading-2": "h2",
    "heading-3": "h3",
    "body-large": "p",
    "body-small": "span",
  };

  const Component = as ?? map[variant];

  return <StyledTypography as={Component} $variant={variant} {...props} />;
};
