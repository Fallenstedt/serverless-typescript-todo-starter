import sinon from "sinon";
import { lib } from "../libs/dynamodb-lib";
import { main } from "../src/create";

import { APIGatewayEvent } from "aws-lambda";

const sandbox = sinon.createSandbox();

describe("create", () => {
  beforeAll(() => {
    sandbox.stub(lib, "call").returns({ promise: () => true });
  });

  afterAll(() => {
    sandbox.restore();
  });

  test("it exists", () => {
    expect(main).toBeTruthy();
  });

  test("it returns an item that was successfully created ", async () => {
    const event = {
      body: JSON.stringify({ content: "foo", attachment: "foo.jpg" }),
      requestContext: {
        identity: {
          cognitoIdentityId: "123abc"
        }
      }
    };
    const response = await main(event as APIGatewayEvent);

    expect(response.statusCode).toBe(200);
    expect(response.headers["Access-Control-Allow-Origin"]).toEqual("*");
    expect(response.headers["Access-Control-Allow-Credentials"]).toEqual(true);
    expect(response.body).toBeTruthy();

    const parsedBody = JSON.parse(response.body);
    expect(parsedBody.userid).toBe("123abc");
    expect(parsedBody.noteid).toBeTruthy();
    expect(parsedBody.content).toBe("foo");
    expect(parsedBody.attachment).toBe("foo.jpg");
    expect(parsedBody.createdAt < Date.now()).toBe(true);
  });
});
