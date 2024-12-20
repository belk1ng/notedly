import { StyledAside, StyledAsideHeader } from "./styled";
import { Typography } from "@/components";
import { Navigation } from "..";
import LogoIcon from "/public/logo.svg?react";

export const Sidebar = () => {
  return (
    <StyledAside>
      <StyledAsideHeader>
        <LogoIcon />
        <Typography variant="heading-3" component="h1">
          Notedly
        </Typography>
      </StyledAsideHeader>

      <Navigation />
    </StyledAside>
  );
};
