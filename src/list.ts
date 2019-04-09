import { lib } from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";
import { APIGatewayEvent } from "aws-lambda";

export async function main(event: APIGatewayEvent) {
  const params = {
    TableName: "notes",
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
    KeyConditionExpression: "userid = :userid",
    ExpressionAttributeValues: {
      ":userid": event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    const result = await lib.call("query", params);
    // Return the matching list of items in response body
    return success(result.Items);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
