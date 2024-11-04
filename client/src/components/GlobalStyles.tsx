import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    html {
        scroll-behavior: smooth;
        overflow: hidden;
    }

    body {
        box-sizing: border-box;
        font-optical-sizing: auto;
        -webkit-font-smoothing: antialiased;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
        
        background-color: ${(props) => props.theme.colors.neutral.white};
        color: ${(props) => props.theme.colors.neutral.primary};
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
        margin: 0;
        padding: 0;
        line-height: 1.5;
    }

    :where(fieldset[class]) {
        border: none;
    }

    ul {
        list-style: none;
    }

    img {
        display: block;
        max-width: 100%;
    }

    input,
    textarea,
    select,
    button {
        font: inherit;
    }

    svg *[fill] {
        fill: currentcolor;
    }

    svg *[stroke] {
        stroke: currentcolor;
    }

    svg * {
        transition-property: fill, stroke;
    }

    @media (prefers-reduced-motion: reduce) {
        * {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
        }
    }

    #root {
        width: 100%;
        height: 100dvh;
        display: flex;
    }
`;
