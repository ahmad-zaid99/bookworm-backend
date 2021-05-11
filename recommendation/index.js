const AWS = require('aws-sdk');
const DynamoDBClient = new AWS.DynamoDB.DocumentClient();
const awsConfigs = require('./awsConfigs');
const fetch = require('./fetch');

const {formErrorResponse,formOkResponse } = require('./utils/responseTemplate');

AWS.config.region = awsConfigs.region;

exports.handler = async (event) => {
    const table = awsConfigs.tableName;
    
    //fetch all books except current user - incomplete
    let books = fetch(DynamoDBClient,table);

    // filter according to permissable distance and also add distance value in books
    books = filter(books,)

    // add ratings - complete
    books = distanceScore(books);
    books = tagScore(books);

    // sort according to scores

    books = sortByScore(books);

    return books;

};