import { ApplicationError } from '@application/errors/application-error.error';

export class UniqueIdFormatError extends ApplicationError {
  name = 'UniqueIdFormatErrorError';
}
