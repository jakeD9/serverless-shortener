import type { DynamoDB } from "aws-sdk";

/**
 * generic service for interacting with any DynamoDB table
 * as long as permissions are set correctly.
 *
 * futureproofing in case other tables are added.
 * or to rip out later for a different project. maybe.
 */

export const putItem = async <T = unknown>(
  client: DynamoDB.DocumentClient,
  table: string,
  item: T
): Promise<DynamoDB.DocumentClient.PutItemOutput> => {
  console.log(`DynamoDB.putItem() - storing item in table [${table}]`);

  try {
    const input: DynamoDB.DocumentClient.PutItemInput = {
      TableName: table,
      Item: item,
    };

    const { $response } = await client.put(input).promise();

    if ($response.error) {
      throw new Error($response.error.message);
    } else if (!$response.data) {
      // extra defensive code just to double check for errors
      // data will always be an empty obj on put, JS treats this as true
      throw new Error("No data received from putItem() output");
    }

    // TODO: clean this up. return HttpResponse? or maybe use UpdateItem instead to get the obj back safely
    return $response.data;
  } catch (err) {
    console.error(`putItem() - failure storing item in table [${table}]`, err);
    throw err;
  }
};

export const getItem = async <T = unknown>(
  client: DynamoDB.DocumentClient,
  table: string,
  key: DynamoDB.DocumentClient.Key
): Promise<T> => {
  console.log(`DynamoDB.getItem() - getting item from table [${table}]`);

  try {
    const input: DynamoDB.DocumentClient.GetItemInput = {
      TableName: table,
      Key: key,
      ConsistentRead: true,
    };

    const { $response } = await client.get(input).promise();

    if ($response.error) {
      throw new Error($response.error.message);
    } else if (!$response.data) {
      throw new Error("No data received from getItem() input");
    }

    return $response.data.Item as T;
  } catch (err) {
    console.error(
      `getItem() - failure getting item from table [${table}]`,
      err
    );
    throw err;
  }
};
