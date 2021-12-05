import type { APIGatewayProxyResultV2 } from "aws-lambda";
import { UrlData } from "../models/url-data.model";

const HEADERS: Readonly<{ [key: string]: string }> = Object.freeze({
  "Content-Type": "application/json",
});

// TODO: I'm unsure if there's a way to expose the lambda url to the browser in nextjs using CDK environment variables?
// probably need to send the full url anyway for the browser extension
export const buildSuccessResponse = <T = unknown>(
  response: UrlData,
  createdUrl: string
): APIGatewayProxyResultV2 => {
  response.url = createdUrl
  return {
    body: typeof response === "string" ? response : JSON.stringify(response),
    isBase64Encoded: false,
    headers: HEADERS,
    statusCode: 200,
  }
};

export const buildErrorResponse = (
  err: any,
  requestId: string,
  statusCode = 400
): APIGatewayProxyResultV2 => ({
  body: JSON.stringify({
    message: err.message,
    requestId: requestId,
  }),
  isBase64Encoded: false,
  headers: HEADERS,
  statusCode,
});

export const buildRedirectResponse = <T = unknown>(
  response: string
): APIGatewayProxyResultV2 => ({
  statusCode: 302,
  isBase64Encoded: false,
  headers: {
    ...HEADERS,
    Location: response,
  },
});
