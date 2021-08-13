import { ErrorRequestHandler } from 'express';
import { CelebrateError, isCelebrateError } from 'celebrate';
import { Logger } from '@application/logger/logger';
import {
  RequestIdAsyncLocalStorage,
  TRANSACTION_ID_HTTP_HEADER,
} from '@application/server/rest/middlewares/request-id.middleware';

interface ErrorResponse {
  errorCode: number;
  message: string;
  name: string;
  translation: string;
  stack: string;
}

interface Dependencies {
  logger: Logger;
  asyncLocalStorage: RequestIdAsyncLocalStorage;
}

export const errorMiddleware = ({
  logger,
  asyncLocalStorage,
}: // eslint-disable-next-line @typescript-eslint/no-unused-vars
Dependencies): ErrorRequestHandler => (err, req, res, _) => {
  const isCelebrate = isCelebrateError(err);

  logger.error(
    `[Request TransactionID: ${asyncLocalStorage
      .getStore()
      .get(TRANSACTION_ID_HTTP_HEADER)}] [HTTP Error ${isCelebrate ? 422 : err.code || 500} at ${
      req.method
    } ${process.env.APP_HOST}:${process.env.APP_PORT}${req.path}] ${err.toString()}`,
  );

  if (isCelebrate) {
    const convertError = (detail) => ({
      key: detail.context.key,
      message: detail.message,
    });

    const bodyDetails = (err as CelebrateError).details.get('body');
    const queryDetails = (err as CelebrateError).details.get('query');
    const paramsDetails = (err as CelebrateError).details.get('params');

    // In real application we should handle other SEGMENTS validations, such cookies, headers etc..
    return res.status(422).json({
      errorCode: 422,
      name: 'ValidationError',
      message: 'Provided request did not validate properly',
      details: {
        bodyErrors: bodyDetails?.details.map(convertError) || [],
        queryErrors: queryDetails?.details.map(convertError) || [],
        paramsErrors: paramsDetails?.details.map(convertError) || [],
      },
    });
  }

  return res.status(Number.isInteger(err.code) ? err.code : 500).json({
    errorCode: err.code || 500,
    name: err.name,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' || err.code === 404 ? undefined : err.stack,
  } as ErrorResponse);
};
