import express, { Application } from 'express';
import request from 'supertest';
import { NotFoundError } from '@application/errors/not-found.error';
import { errorMiddleware } from '@application/server/rest/middlewares/error.middleware';
import { createMockProxy } from '@tools/create-mock-proxy';
import { Logger } from '@application/logger/logger';
import { RequestIdAsyncLocalStorage } from '@application/server/rest/middlewares/request-id.middleware';
import { ApplicationError } from '@application/errors/application-error.error';
import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';
import bodyParser from 'body-parser';
import { BusinessRuleValidationError } from '@application/errors/business-rule-validation.error';

describe('[Infrastructure Express Error Middleware]', () => {
  let app: Application;
  const mockLogger = createMockProxy<Logger>();
  const mockAsyncLocalStorage = createMockProxy<RequestIdAsyncLocalStorage>();
  mockAsyncLocalStorage.getStore.mockImplementation(() => new Map());

  beforeEach(() => {
    app = express();
  });

  test('Should return error 404', async () => {
    app.get('/', () => {
      throw new NotFoundError('Some error message');
    });
    app.use('*', errorMiddleware({ logger: mockLogger, asyncLocalStorage: mockAsyncLocalStorage }));

    const res = await request(app).get('/').set('Accept', 'application/json');

    expect(res.status).toEqual(404);
    expect(res.body.name).toEqual('NotFoundError');
    expect(res.body.message).toEqual('Some error message');
  });

  test('Should return error 500', async () => {
    app.get('/', () => {
      throw new ApplicationError('Some error message');
    });
    app.use('*', errorMiddleware({ logger: mockLogger, asyncLocalStorage: mockAsyncLocalStorage }));

    const res = await request(app).get('/').set('Accept', 'application/json');

    expect(res.status).toEqual(500);
    expect(res.body.name).toEqual('AppError');
    expect(res.body.message).toEqual('Some error message');
  });

  test('Should return custom error', async () => {
    app.get('/', () => {
      throw new BusinessRuleValidationError('You should not do it', 666);
    });
    app.use('*', errorMiddleware({ logger: mockLogger, asyncLocalStorage: mockAsyncLocalStorage }));

    const res = await request(app).get('/').set('Accept', 'application/json');

    expect(res.status).toEqual(666);
    expect(res.body.name).toEqual('BusinessRuleValidationError');
    expect(res.body.message).toEqual('You should not do it');
  });

  test('Should return error 500 for generic errors', async () => {
    app.get('/', () => {
      throw new Error('Generic error message');
    });
    app.use('*', errorMiddleware({ logger: mockLogger, asyncLocalStorage: mockAsyncLocalStorage }));

    const res = await request(app).get('/').set('Accept', 'application/json');

    expect(res.status).toEqual(500);
    expect(res.body.name).toEqual('Error');
    expect(res.body.message).toEqual('Generic error message');
  });

  test('Should return validation error for query', async () => {
    const validation = celebrate(
      {
        [Segments.QUERY]: {
          test: Joi.string().required(),
        },
      },
      {
        abortEarly: false,
      },
    );

    app.get('/', validation);
    app.use('*', errorMiddleware({ logger: mockLogger, asyncLocalStorage: mockAsyncLocalStorage }));

    const res = await request(app).get('/').set('Accept', 'application/json').send();

    expect(res.status).toEqual(422);
    expect(res.body.name).toEqual('ValidationError');
    expect(res.body.message).toEqual('Provided request did not validate properly');
    expect(res.body.details.queryErrors.map((detail) => detail.key)).toEqual(['test']);
  });

  test('Should return validation error for body', async () => {
    const validation = celebrate(
      {
        [Segments.BODY]: {
          test: Joi.string().required(),
        },
      },
      {
        abortEarly: false,
      },
    );

    app.use(bodyParser.json());
    app.post('/', validation);
    app.use('*', errorMiddleware({ logger: mockLogger, asyncLocalStorage: mockAsyncLocalStorage }));

    const res = await request(app).post('/').set('Accept', 'application/json').send();

    expect(res.status).toEqual(422);
    expect(res.body.name).toEqual('ValidationError');
    expect(res.body.message).toEqual('Provided request did not validate properly');
    expect(res.body.details.bodyErrors.map((detail) => detail.key)).toEqual(['test']);
  });
});
