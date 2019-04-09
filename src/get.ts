import { call } from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";
import { APIGatewayEvent } from "aws-lambda";

export async function main(event: APIGatewayEvent) {
  const params = {
    TableName: "notes",
    Key: {
      userid: event.requestContext.identity.cognitoIdentityId,
      noteid: event.pathParameters.id
    }
  };
  try {
    const result = await call("get", params);
    if (result.Item) {
      // Return the retrieved item
      return success(result.Item);
    } else {
      return failure({ status: false, error: "Item not found." });
    }
  } catch (e) {
    return failure({ status: false });
  }
}
