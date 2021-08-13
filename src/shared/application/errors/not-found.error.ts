import { ApplicationError } from '@application/errors/application-error.error';

export class NotFoundError extends ApplicationError {
  name = 'NotFoundError';

  code = 404;
}
