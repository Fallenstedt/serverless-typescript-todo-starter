import { DynamoDB } from "aws-sdk";

export const lib = {
  call(action, params) {
    const dynamoDb = new DynamoDB.DocumentClient();

    return dynamoDb[action](params).promise();
  }
};
