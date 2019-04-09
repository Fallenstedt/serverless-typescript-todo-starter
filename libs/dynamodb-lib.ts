import { DynamoDB } from "aws-sdk";

export function call(action, params) {
  const dynamoDb = new DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}
