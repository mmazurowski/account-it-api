import { ApplicationError } from '@application/errors/application-error.error';

export class UnauthorizedError extends ApplicationError {
  name = 'UnauthorizedError';

  code = 403;
}
