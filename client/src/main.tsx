import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "@/components";
import { router } from "@/router";
import { darkTheme } from "@/theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <RouterProvider router={router} />
      <GlobalStyles />
    </ThemeProvider>
  </StrictMode>,
);
