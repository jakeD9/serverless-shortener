import React from "react";
import { ThemeProvider, createGlobalStyle, keyframes } from "styled-components";

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

const gradient = keyframes`
  0% {
    background-position: 0% 40%
  }
  50% {
    background-position: 100% 61%
  }
  100% {
    background-position: 0% 41%
  }
`

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
    background: ${({theme}) => theme.palette.papaya};
  }
`;

export const CustomThemeProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Baseline />
    {children}
  </ThemeProvider>
);
