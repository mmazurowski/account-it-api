import { RequestHandler } from 'express';
import { AsyncLocalStorage } from 'async_hooks';
import { v4 } from 'uuid';
import { Logger } from '@application/logger/logger';

export type RequestIdAsyncLocalStorage = AsyncLocalStorage<Map<string, string>>;

export const asyncLocalStorage = new AsyncLocalStorage<Map<string, string>>();

export const TRANSACTION_ID_HTTP_HEADER = 'x-transaction-id';

interface Dependencies {
  logger: Logger;
  asyncLocalStorage: RequestIdAsyncLocalStorage;
}

export const requestIdMiddleware = ({
  logger,
  asyncLocalStorage: asyncStorage,
}: Dependencies): RequestHandler => (req, res, next) => {
  asyncStorage.run(new Map(), () => {
    const transactionId = (req.headers[TRANSACTION_ID_HTTP_HEADER] as string) || v4();

    asyncStorage.getStore().set(TRANSACTION_ID_HTTP_HEADER, transactionId);

    // This should be configured based on reverse proxy and [X-Forwarded-For] HTTP Header
    logger.info(
      `[Request TransactionID: ${transactionId}] Assigned ID to the request from ${req.ip}`,
    );

    res.setHeader(TRANSACTION_ID_HTTP_HEADER, transactionId);

    next();
  });
};
