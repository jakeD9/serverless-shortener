import { APIGatewayProxyEventV2, Context } from "aws-lambda";

export const createUrl = () => {
    console.log('createurl');
}

export const redirectUrl = () => {
    console.log('redirecturl');
}

export const urlInfo = (event: APIGatewayProxyEventV2, context: Context) => {
    console.log('urlinfo');
    console.log(event);
    console.log(context);
    return {
        statusCode: 200,
        body: 'urlinfo',
        anotherdata: '1234'
    }
}