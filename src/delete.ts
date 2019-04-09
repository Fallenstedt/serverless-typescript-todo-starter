import { lib } from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";
import { APIGatewayEvent } from "aws-lambda";

export async function main(event: APIGatewayEvent) {
  const params = {
    TableName: "notes",
    // 'Key' defines the partition key and sort key of the item to be removed
    // - 'userid': Identity Pool identity id of the authenticated user
    // - 'noteid': path parameter
    Key: {
      userid: event.requestContext.identity.cognitoIdentityId,
      noteid: event.pathParameters.id
    }
  };

  try {
    await lib.call("delete", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
