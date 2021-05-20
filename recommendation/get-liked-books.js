const AWS = require('aws-sdk');
AWS.config.region = "ap-south-1";

const DynamoDB = require("aws-sdk/clients/dynamodb");
const DynamoDBClient = new DynamoDB.DocumentClient({region : "ap-south-1"})


const handler = async (userId) => {
    
    var params = {
        TableName: "book-match",
        KeyConditionExpression: 'user1 = :user1',
        ExpressionAttributeValues: {
            ':user1': userId
        }
    };
    //console.log('params: ',params);
    
    const res = await DynamoDBClient.query(params).promise();
    
    const bookList = [];
    res.Items.forEach(item => {
        bookList.push(...item.book1_2);
    })
    
    return bookList;
};

module.exports = handler;