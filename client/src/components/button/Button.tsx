import type { HTMLAttributes } from "react";
import { Typography } from "@/components";
import { StyledButton } from "./styled";

export type ButtonVariant = "filled" | "outlined";

export interface StyledButtonProps {
  $variant: ButtonVariant;
  $fullWidth?: boolean;
}

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export const Button = ({
  variant = "filled",
  fullWidth = false,
  children,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton $fullWidth={fullWidth} $variant={variant} {...props}>
      <Typography variant="body-small">{children}</Typography>
    </StyledButton>
  );
};
