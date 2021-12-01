import styled, { keyframes } from "styled-components";
import Head from "next/head";
import { CustomThemeProvider } from "../constants/theme";
import { Form } from '../common'

export default function Home() {
  return (
    <CustomThemeProvider>
      <Head>
        <title>URL Shortener</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Crimson+Pro"
        />
      </Head>
      <Title>Serverless URL Shortener</Title>
      <Box>
        <Form />
      </Box>
    </CustomThemeProvider>
  );
}

const Title = styled.h1`
  color: white;
  font-size: 40px;
  text-align: center;
`;

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
`;

const Box = styled.div`
  background: gray;
  /* background: linear-gradient(40deg, #cacaaaff, #7f636eff, #eec584ff);
  animation: ${gradient} 30s ease infinite;
  background-size: 600% 600%; */
  height: 600px;
  width: 600px;
  margin: auto;
  border-radius: 7px;
`;
