const AWS = require('aws-sdk');
const { tableName } = require('./awsConfigs');
const DynamoDBClient = new AWS.DynamoDB.DocumentClient();
const awsConfigs = require('./awsConfigs');
const fetch = require('./fetch');
const filter = require('./filtration');

const {formErrorResponse,formOkResponse } = require('./utils/responseTemplate');

AWS.config.region = awsConfigs.region;

exports.handler = async (event) => {
    const table = awsConfigs.tableName;

    let all_books = fetch(DynamoDBClient,table);

    const users = event.body.users ;

    users.map( user => {

        // filter according to permissable distance and also add distance value in books
        let books = filter(all_books,user.location,user.distance,user.userId);

        // add ratings - complete
        books = distanceScore(books,user.distance);
        books = tagScore(books,user.tags.length);

        // sort according to scores

        books = sortByScore(books);
        
        return books;

    


    });
}