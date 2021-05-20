const AWS = require('aws-sdk');
var lambda = new AWS.Lambda();

const {formErrorResponse,formOkResponse } = require('../utils/responseTemplate');

const handler = async (event,DynamoDBClient,table) => {
    let body = JSON.parse(event.body);
    console.log(body);
    
    let user = body.user;
    console.log("USER", user);
    let params = {
        TableName : table,
        Item : user
    };
    console.log(params);
    try{
        await DynamoDBClient.put(params).promise();
    } catch(err) {
        console.log('err',err);
        return formErrorResponse(err);
    }
    console.log("HELLO");
    let params2 = {
        FunctionName: "recommendation", 
        Payload: JSON.stringify(user)
        
    };
    let reslt = await lambda.invoke(params2).promise();
    console.log(reslt);
    
    
    
    return formOkResponse("User created successfully");
};

module.exports = handler;

