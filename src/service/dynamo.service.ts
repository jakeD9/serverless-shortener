import type { DynamoDB } from "aws-sdk";

/**
 * Generic service for interacting with any DynamoDB table
 * as long as permissions are set correctly.
 * 
 * Futureproofing in case other tables are added.
 * Or to rip out later for a different project. Who cares.
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
            throw new Error('No data received from putItem() output');
        }

        return $response.data;
    } catch (err) {
        console.error(`putItem() - failure storing item in table [${table}]`, err);
        throw err;
    }
}

export const getItem = async <T = unknown>(
    client: DynamoDB.DocumentClient,
    table: string,
    key: DynamoDB.DocumentClient.Key,
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
            throw new Error($response.error.message)
        } else if (!$response.data) {
            throw new Error('No data received from getItem() input');
        }

        return $response.data.Item as T;
    } catch (err) {
        console.error(`getItem() - failure getting item from table [${table}]`, err);
        throw err;
    }

}
