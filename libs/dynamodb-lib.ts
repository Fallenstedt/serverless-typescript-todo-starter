import { DynamoDB } from "aws-sdk";

export const lib = {
  call(action, params) {
    console.log('calling');
    const dynamoDb = new DynamoDB.DocumentClient();

    return dynamoDb[action](params).promise();
  }
};
