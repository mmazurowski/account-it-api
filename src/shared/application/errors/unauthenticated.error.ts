import { ApplicationError } from '@application/errors/application-error.error';

export class UnauthenticatedError extends ApplicationError {
  name = 'UnauthenticatedError';

  code = 401;
}
