const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION });
const { tableName } = require('./awsConfigs');
const DynamoDBClient = new AWS.DynamoDB.DocumentClient();
const awsConfigs = require('./awsConfigs');
const fetch = require('./fetch');
const filter = require('./filtration');
const distanceScore = require('./distance-score');
const tagScore = require('./tag-score');
const sortByScore = require('./sort-by-score');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

//const {formErrorResponse,formOkResponse } = require('./utils/responseTemplate');

AWS.config.region = awsConfigs.region;

/*

2021-05-19T15:48:50.864Z	3c6535cb-726a-44fa-8ef7-03ea589df9eb	INFO	{
  version: '0',
  id: 'ac65d71d-6b79-6544-fbd7-99f386540011',
  'detail-type': 'Scheduled Event',
  source: 'aws.events',
  account: '433297222477',
  time: '2021-05-19T15:48:02Z',
  region: 'ap-south-1',
  resources: [ 'arn:aws:events:ap-south-1:433297222477:rule/periodic-run' ],
  detail: {}
}



*/



async function uploadObjectToS3Bucket(objectName, objectData) {
    const Key = `all-books-ranked/${objectName}.json`;
  const params = {
    Bucket: 'bookworm01',
    Key,
    Body: objectData,
     ContentType: 'application/json; charset=utf-8'
  };
  
  console.log("HELLO  LINE 26");
    let reslt = await s3.putObject(params).promise();
    console.log(reslt);
  
  
  
   
    
}

exports.handler = async (event) => {
    console.log(event);
    var table = "user-details";
    let users;
    if(event.source =="aws.events"){
        users = await fetch(DynamoDBClient,table);
    }
    else{
        users = [] ;
        users.push(event);
    }
    //console.log("36", users);
    
    table = tableName;

    let all_books =await fetch(DynamoDBClient,table);
    
    //console.log("42", all_books);
    
    // console.log('all_books',all_books);

    
    /*
     var params = {
        TableName: "user-details",
        KeyConditionExpression: 'userId = :id',
        ExpressionAttributeValues: {
          ':id': userId
        }
     };
     let res = await DynamoDBClient.query(params).promise();
     let users = res.Items;
     */
     //console.log('users',users);
    
    let response = [] ;
    
    let promiseList = [] ;

    promiseList =  users.map(async user => {
        
        //console.log("MANDAL : THE FRONTEND GOD, PRASHANT: BEZOS KA DAMAD");
        // filter according to permissable distance and also add distance value in books
        let books =await  filter(all_books,user.lat,user.long,user.distance,user.userId,user.tags);
        
        //console.log('BOOKS', books);

        // add ratings - complete
        books = await distanceScore(books,user.userDistance);
        
        var cnt_tags = 1 ;
        if(users.tags){
            cnt_tags =users.tags.length;
        }
        
        books = await tagScore(books,cnt_tags);
        
      // console.log(books);

        // sort according to scores

        books =await  sortByScore(books);
        
        //console.log(books);
        
        response.push({"userId": user.userId, "books": books});
        
       // console.log(response);
        //return Promise.resolve("DONE");
       
        //return books;
        await uploadObjectToS3Bucket(user.userId, JSON.stringify(books));
    });
    
    await Promise.all(promiseList) ;
    
    console.log("101", response);
    
    return null ;
};