const {formErrorResponse,formOkResponse } = require('../utils/responseTemplate');

const handler = async (event,DynamoDBClient,table) => {
    let queryParameters = event.queryStringParameters;
    console.log('queryParameters', queryParameters);
    
    const userId = queryParameters.userId;
    
    var params = {
        TableName: table,
        KeyConditionExpression: 'userId = :id',
        ExpressionAttributeValues: {
          ':id': userId
        }
    };
    
    let user = null;
    
    try{
        let res = await DynamoDBClient.query(params).promise();
        user = res.Items[0];
    } catch(err) {
        console.log('err',err);
        return formErrorResponse(err);
    }
    return formOkResponse(user);
}

module.exports = handler;

