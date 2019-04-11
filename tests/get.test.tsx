import sinon from 'sinon';
import { lib } from '../libs/dynamodb-lib';
import { main } from '../src/get';
import { APIGatewayEvent } from 'aws-lambda';

const sandbox = sinon.createSandbox();

describe('get', () => {
  beforeAll(() => {
    sandbox.stub(lib, 'call').returns({ Item: 'I am a real item' })
  })
  afterAll(() => {
    sandbox.restore();
  })

  test('it exists', () => {
    expect(main).toBeTruthy();
  });

  test('it can get an item', async () => {
    const event = {
      pathParameters: {
        id: "b409e880-5688-11e9-9a33-4f797a8ad494"
      },
      requestContext: {
        identity: {
          cognitoIdentityId: "USER-SUB-1234"
        }
      }
    } as unknown as APIGatewayEvent;
    const response = await main(event);
    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toBe("I am a real item");

  });
});