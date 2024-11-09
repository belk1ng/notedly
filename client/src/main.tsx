import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "@/components";
import { router } from "@/router";
import { darkTheme } from "@/theme";

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URI,
  cache: new InMemoryCache(),
  devtools: {
    enabled: true,
  },
  defaultOptions: { watchQuery: { fetchPolicy: "cache-and-network" } },
});

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
