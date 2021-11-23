import type { APIGatewayProxyResultV2 } from "aws-lambda";

const HEADERS: Readonly<{ [key: string]: string }> = Object.freeze({
  "Content-Type": "application/json",
});

export const buildSuccessResponse = <T = unknown>(
  response: T
): APIGatewayProxyResultV2 => ({
  body: typeof response === "string" ? response : JSON.stringify(response),
  isBase64Encoded: false,
  headers: HEADERS,
  statusCode: 200,
});

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
