const {formErrorResponse,formOkResponse } = require('../utils/responseTemplate');

const handler = async (DynamoDBClient,table) => {
    const params = {
        TableName: tableName,
    };
    let books = DynamoDBClient.scan(params, function(err, data){
        if(err){
            console.log(err);
        }
    });

    return books;
}

module.exports = handler;


