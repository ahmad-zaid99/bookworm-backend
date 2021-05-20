const AWS = require('aws-sdk');
var lambda = new AWS.Lambda();

const {formErrorResponse,formOkResponse } = require('../utils/responseTemplate');

const handler = async (event,DynamoDBClient,table) => {
    let body = JSON.parse(event.body);
    console.log(body);
    
    let user = body.user;

    let params = {
        TableName : table,
        Item : user
    };
    
    try{
        await DynamoDBClient.put(params).promise();
    } catch(err) {
        console.log('error',err);
        return formErrorResponse(err);
    }
    
    let params2 = {
        FunctionName: "recommendation", 
        Payload: JSON.stringify(user)
        
    };
    let reslt = await lambda.invoke(params2).promise();
    console.log(reslt);
    
    return formOkResponse("User updated successfully");
}

module.exports = handler;
