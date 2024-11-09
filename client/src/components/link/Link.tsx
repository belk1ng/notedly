import { type LinkProps } from "react-router-dom";
import { Typography } from "@/components";
import { StyledLink } from "./styled";

export const Link = ({ children, ...props }: LinkProps) => {
  return (
    <StyledLink {...props}>
      <Typography component="span" variant="body-large">
        {children}
      </Typography>
    </StyledLink>
  );
};
