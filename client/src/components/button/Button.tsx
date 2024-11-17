import type { ButtonHTMLAttributes } from "react";
import { Typography } from "@/components";
import { StyledButton } from "./styled";
import { Ripple } from "../ripple";

export type ButtonVariant = "filled" | "outlined";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export type StyledButtonProps = BuckPick<ButtonProps, "variant" | "fullWidth">;

export const Button = ({
  variant = "filled",
  fullWidth = false,
  type = "button",
  children,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      $fullWidth={fullWidth}
      $variant={variant}
      type={type}
      {...props}
    >
      <Typography variant="body-small">{children}</Typography>
      <Ripple />
    </StyledButton>
  );
};
