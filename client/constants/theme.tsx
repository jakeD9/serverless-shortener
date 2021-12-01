import React from "react";
import styled, { ThemeProvider, createGlobalStyle, keyframes } from "styled-components";

/**
 * color theme generated from coolors.co
 */
const theme = {
  palette: {
    burgundy: "#4f3130ff",
    catawba: "#753742ff",
    mediumCarmine: "#aa5042ff",
    goldCrayola: "#d8bd8aff",
    yellowCrayola: "#d8d78fff",
  },
  typography: {
    fontFamily: "Crimson Pro",
    fontWeightBold: 700,
    fontSize: 14,
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
    background: #383e42ff;
  }
`;

export const CustomThemeProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Baseline />
    {children}
  </ThemeProvider>
);
