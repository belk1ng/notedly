import type { HTMLAttributes } from "react";
import { StyledButton } from "./styled.ts";
import { Typography } from "@/components";

export type ButtonVariant = "filled" | "outlined";

export interface StyledProps {
  $variant: ButtonVariant;
}

interface Props extends HTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = ({ variant = "filled", children, ...props }: Props) => {
  return (
    <StyledButton $variant={variant} {...props}>
      <Typography variant="body-small">{children}</Typography>
    </StyledButton>
  );
};
