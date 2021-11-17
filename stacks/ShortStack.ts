import * as sst from '@serverless-stack/resources';
import { CorsHttpMethod } from '@aws-cdk/aws-apigatewayv2';

export default class ShortStack extends sst.Stack {
    constructor(scope: sst.App, id: string, props?: sst.StackProps) {
        super(scope, id, props);

        const stage = scope.stage;

        // DynamoDB table to hold the minified "short" and url
        const urlTableName = `UrlTable_${stage}`
        const urlTable = new sst.Table(this, 'UrlData', {
            fields: {
                short: sst.TableFieldType.STRING,
                url: sst.TableFieldType.STRING,
                hits: sst.TableFieldType.NUMBER
            },
            primaryIndex: { partitionKey: 'short' },
            dynamodbTable: {
                tableName: urlTableName
            },
        });

        // REST API
        const api = new sst.Api(this, 'API', {
            defaultFunctionProps: {
                timeout: 50,
                environment: { tableName: urlTable.tableName },
                permissions: [urlTable]
            },
            cors: {
                allowMethods: [
                    CorsHttpMethod.GET,
                    CorsHttpMethod.POST,
                    CorsHttpMethod.OPTIONS,
                ],
                allowHeaders: ['Content-Type', 'Accept']
            },
        });

        api.addRoutes(this, {
            'POST    /url': 'src/lambda/shortener-api.createUrl',
            'GET    /{urlId}': 'src/lambda/shortener-api.redirectUrl',
            'GET    /url/{urlId}': 'src/lambda/shortener-api.urlInfo',
        });

        api.attachPermissions([urlTable]);
    }
}