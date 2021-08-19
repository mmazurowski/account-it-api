import * as Awilix from 'awilix';
import request from 'supertest';

import { System } from '@lunar-flight-v/system';
import { testRuntime } from '@system/runtimes/test.runtime';
import { Application } from 'express';

const ENDPOINT = '/auth/login';

describe(`[REST API ${ENDPOINT}]`, () => {
  let container: Awilix.AwilixContainer;
  let app: Application;
  const system = new System();

  beforeAll(async () => {
    container = (await system.execute(testRuntime)) as Awilix.AwilixContainer;
    app = container.resolve<Application>('server');
  });

  test('should throw an error when wrong payload', async () => {
    const res = await request(app).post(ENDPOINT).set('accept', 'application/json').send({});

    expect(res.body.details.bodyErrors.map(({ key }) => key)).toEqual(['email', 'password']);
    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual('Provided request did not validate properly');
  });
});
