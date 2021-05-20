const {formErrorResponse,formOkResponse } = require('./utils/responseTemplate');

const handler = async (DynamoDBClient,table) => {
    const params = {
        TableName: table
    };
    let books = await DynamoDBClient.scan(params, function(err, data){
        if(err){
            console.log(err);
        }
        if(data){
            //console.log(data);
        }
    }).promise();
    
    books = books.Items ;
    
    //console.log("BOOKS :: " + books);

    return books;
};

module.exports = handler;


