import uuid from "uuid";
import { lib } from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";
import { APIGatewayEvent } from "aws-lambda";

export async function main(event: APIGatewayEvent) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "notes",
    Item: {
      userid: event.requestContext.identity.cognitoIdentityId,
      noteid: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  try {
    await lib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
