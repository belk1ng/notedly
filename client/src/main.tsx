import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "@/components";
import { router } from "@/router";
import { darkTheme } from "@/theme";
import { client } from "@/apollo";

loadDevMessages();
loadErrorMessages();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <RouterProvider router={router} />
        <GlobalStyles />
      </ThemeProvider>
    </ApolloProvider>
  </StrictMode>,
);
