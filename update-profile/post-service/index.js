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
        console.log('err',err);
        return formErrorResponse(err);
    }
    return formOkResponse("User created successfully");
}

module.exports = handler;

