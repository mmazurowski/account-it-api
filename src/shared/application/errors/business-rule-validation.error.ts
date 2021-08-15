import { ApplicationError } from '@application/errors/application-error.error';

export class BusinessRuleValidationError extends ApplicationError {
  name = 'BusinessRuleValidationError';

  constructor(public readonly message: string, public readonly code = 400) {
    super(message, code);
  }
}
