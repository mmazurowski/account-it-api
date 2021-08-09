export class ApplicationError extends Error {
  name = 'AppError';

  constructor(public readonly message: string, public readonly code?: number) {
    super(message);

    Error.captureStackTrace(ApplicationError);
  }
}
