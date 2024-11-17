import type { ComponentPropsWithoutRef } from "react";
import { StyledTypography } from "./styled";

export type TypographyVariant =
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "body-large"
  | "body-small";

export interface StyledProps {
  $variant: TypographyVariant;
}

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
  | "pre"
  | "time"
  | "sub"
  | "sup";

export type TypographyProps<As extends TypographyPolymorphic> = {
  component?: As;
  variant?: TypographyVariant;
} & ComponentPropsWithoutRef<As>;

export const Typography = <As extends TypographyPolymorphic>({
  component,
  variant = "body-small",
  ...props
}: TypographyProps<As>) => {
  const map: Record<TypographyVariant, TypographyPolymorphic> = {
    "heading-1": "h1",
    "heading-2": "h2",
    "heading-3": "h3",
    "body-large": "p",
    "body-small": "span",
  };

  const Component = component ?? map[variant];

  return <StyledTypography as={Component} $variant={variant} {...props} />;
};
