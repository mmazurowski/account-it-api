import express, { Application } from 'express';
import request from 'supertest';
import { createMockProxy } from '@tools/create-mock-proxy';
import { Logger } from '@application/logger/logger';
import {
  asyncLocalStorage,
  requestIdMiddleware,
} from '@application/server/rest/middlewares/request-id.middleware';
import { v4 } from 'uuid';

describe('[Infrastructure Express Request Transaction ID Middleware]', () => {
  let app: Application;
  const mockLogger = createMockProxy<Logger>();

  beforeEach(() => {
    app = express();
  });

  test('Should assign transaction id', async () => {
    app.use('*', requestIdMiddleware({ logger: mockLogger, asyncLocalStorage }));

    app.get('/', (req, res) => {
      res.sendStatus(200);
    });

    const res = await request(app).get('/').set('Accept', 'application/json');

    expect(res.headers['x-transaction-id']).toBeTruthy();
  });

  test('Should reuse transaction id on retry', async () => {
    app.use('*', requestIdMiddleware({ logger: mockLogger, asyncLocalStorage }));

    app.get('/', (req, res) => {
      res.sendStatus(200);
    });

    const id = v4();

    const res = await request(app)
      .get('/')
      .set('Accept', 'application/json')
      .set('x-transaction-id', id);

    expect(res.headers['x-transaction-id']).toEqual(id);
  });
});
