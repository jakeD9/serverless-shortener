import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";

/**
 * color theme generated from coolors.co
 */
const theme = {
  palette: {
    papaya: "#FFEECF",
    tumbleweed: "#C9A690",
    satin: "#D36582",
    rust: "#A44D1A",
  },
  typography: {
    fontFamily: "Crimson Pro",
    fontWeightBold: 700,
    fontSize: 14,
    color: "#383e42ff",
  },
};

const Baseline = createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Crimson Pro';
  }
  * > strong,
  b {
    font-weight: 700;
  }
  *::before,
  *::after {
    box-sizing: inherit;
  }
  body {
    background: #FFEECF;
  }
`;

export const CustomThemeProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Baseline />
    {children}
  </ThemeProvider>
);
