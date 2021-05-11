const AWS = require('aws-sdk');
const DynamoDBClient = new AWS.DynamoDB.DocumentClient();
const awsConfigs = require('./awsConfigs');

const {formErrorResponse,formOkResponse } = require('./utils/responseTemplate');
const postService = require('./post-service/index');
const putService = require('./put-service/index');
const getService = require('./get-service/index');

AWS.config.region = awsConfigs.region;

exports.handler = async (event) => {
    
    const table = awsConfigs.tableName;
    
    console.log("event.httpMethod",event.httpMethod);
    
    switch(event.httpMethod) {
        case "POST" :
            return await postService(event,DynamoDBClient,table);
        case "PUT" :
            return await putService(event,DynamoDBClient,table);
       case "GET" :
            return await getService(event,DynamoDBClient,table);
        // case "DELETE" :
        //     return deleteService.handler(event, DynamoDBClient, SERVICE_PROVIDER_TABLE);
        default:
            return formErrorResponse("Invalid action", 404);
    }
};

