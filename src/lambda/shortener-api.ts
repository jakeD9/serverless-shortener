import { APIGatewayProxyEventV2, Context } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { nanoid } from "nanoid";

import { UrlForm, formSchema } from "../util/form.schema";
import { getItem, putItem } from "../service/dynamo.service";
import {
  buildErrorResponse,
  buildRedirectResponse,
  buildSuccessResponse,
} from "../util/response.utils";
import { UrlData } from "../models/url-data.model";

const dynamo = new DynamoDB.DocumentClient({
  region: process.env.region,
  apiVersion: "latest",
});
const tableName = "UrlTable_dev"; // placeholder for when this gets moved to be set in .env file

// POST
// create URL with optional user requested url id
export const createUrl = async (
  event: APIGatewayProxyEventV2,
  context: Context
) => {
  console.log("creating short url");

  try {
    // validate JSON exists, and form data with yup
    const urlForm: UrlForm | null =
      event.body != null ? (JSON.parse(event.body) as UrlForm) : null;
    if (urlForm == null) {
      return buildErrorResponse(
        new Error(
          "Error validating the integrity of the request - form may be empty."
        ),
        context.awsRequestId
      );
    }
    // eslint-disable-next-line prefer-const
    let { requestedKey, url } = urlForm;
    await formSchema.validate({ requestedKey, url });

    // check for requested key. if none, give it a nanoid
    if (!requestedKey) {
      requestedKey = nanoid(4);
    } else {
      // TODO: this block might be unnecessary. look into forcing uniqueness from dynamo.put() with conditionals?
      const tableKey: DynamoDB.DocumentClient.Key = { short: requestedKey };
      const short = await getItem(dynamo, tableName, tableKey);

      // if found, return error
      if (short) {
        return buildErrorResponse(
          new Error("Your desired short url is in use!"),
          context.awsRequestId
        );
      }
    }
    requestedKey = requestedKey.toLowerCase();

    // put in db
    const shortUrl: UrlData = {
      short: requestedKey,
      url,
      hits: 0,
      created: Date.now(),
    };
    const createdUrl = await putItem(dynamo, tableName, shortUrl);

    // debugging
    console.debug(createdUrl);

    return buildSuccessResponse(shortUrl);
  } catch (err) {
    console.error("api.createUrl() - failed for reason", err);
    return buildErrorResponse(err, context.awsRequestId);
  }
};

// GET 302 redirect to url given a key
export const redirectUrl = async (
  event: APIGatewayProxyEventV2,
  context: Context
) => {
  const urlId = event?.pathParameters?.urlId;
  console.log(`redirecting from given short url [${urlId}]`);

  try {
    // get url from db
    const tableKey: DynamoDB.DocumentClient.Key = { short: urlId };
    const urlData: UrlData = await getItem(dynamo, tableName, tableKey);

    if (!urlData) {
      return buildErrorResponse(
        new Error("No url found!"),
        context.awsRequestId
      );
    }
    return buildRedirectResponse(urlData.url);
  } catch (err) {
    console.error("api.redirectUrl() - failed for reason", err);
    return buildErrorResponse(err, context.awsRequestId);
  }
};

// GET url info
export const urlInfo = async (
  event: APIGatewayProxyEventV2,
  context: Context
) => {
  const urlId = event?.pathParameters?.urlId;
  console.log(`urlInfo for given short url [${urlId}]`);

  try {
    // get url-data from db
    const tableKey: DynamoDB.DocumentClient.Key = { short: urlId };
    const urlData: UrlData = await getItem(dynamo, tableName, tableKey);

    if (!urlData) {
      return buildErrorResponse(
        new Error("No url found!"),
        context.awsRequestId
      );
    }
    return buildSuccessResponse(urlData);
  } catch (err) {
    console.error("api.urlInfo() - failed for reason", err);
    return buildErrorResponse(err, context.awsRequestId);
  }
};
