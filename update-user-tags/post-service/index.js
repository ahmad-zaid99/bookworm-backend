const {formErrorResponse,formOkResponse } = require('../utils/responseTemplate');

const handler = async (event, DynamoDBClient,table) => {
    
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
    
    
    // tags.forEach(async function(tag){
    //     let it={
    //         "userId": body.userId ,
    //         "tag": tag
    //     };
    //     // it.userId=body.userId;
    //     // it.tag=tag;
    //     console.log(it);
    //     let tagparams = {
    //         TableName : table,
    //         Item : it
    //     };
        // try{
        //     let res = await DynamoDBClient.put(tagparams).promise();
        //     console.log("res : ",res);
        // } catch(err) {
        //     console.log('err',err);
        //     return formErrorResponse(err);
        // }
    // });
    return formOkResponse("tags updated successfully");
        
}

module.exports = handler;