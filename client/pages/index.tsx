import styled from "styled-components";
import Head from "next/head";
import { CustomThemeProvider } from "../constants/theme";
import { FormDisplay } from "../common";

export default function Home() {
  return (
    <CustomThemeProvider>
      <Head>
        <title>URL Shortener Demo Site</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Crimson+Pro"
        />
      </Head>
      <Title>Serverless URL Shortener Demo</Title>
      <Subtitle>Disclaimer: I am not a web designer.</Subtitle>
      <Subtitle>You should just use the browser extension instead!</Subtitle>
      <Box>
        <FormDisplay />
      </Box>
    </CustomThemeProvider>
  );
}

const Title = styled.h1`
  color: ${({ theme }) => theme.typography.color};
  font-size: 40px;
  text-align: center;
`;

const Subtitle = styled.h4`
  color: ${({ theme }) => theme.typography.color};
  text-align: center;
`;

const Box = styled.div`
  background: ${({ theme }) => theme.palette.tumbleweed};
  height: 600px;
  width: 600px;
  margin: auto;
  border-radius: 7px;
`;
