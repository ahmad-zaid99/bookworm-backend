const {formErrorResponse,formOkResponse } = require('../utils/responseTemplate');

const handler = async (event,DynamoDBClient,table) => {
    let body = JSON.parse(event.body);
    console.log(body);
    
    let tags = body.tags;
 let promiseList = tags.map( tag => {
        let tagItem = {
            TableName : table,
            Item : {
                userId : body.userId,
                tag : tag
            }
        }
        console.log('tagItem', tagItem);
        return DynamoDBClient.put(tagItem).promise();
    });
    
    await Promise.all(promiseList);
    
    
    return formOkResponse("T updated successfully");
}

module.exports = handler;