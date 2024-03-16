export abstract class GenericError extends Error {
  readonly errorCode: string;
  readonly userMessage: string;
  readonly systemMessage: string;

  constructor(errorCode: string, systemMessage: string, userMessage?: string) {
    super(systemMessage);
    this.errorCode = `ERROR_${this.getHttpStatus()}_${errorCode}`;
    this.systemMessage = systemMessage;
    this.userMessage = userMessage ?? systemMessage;

    Object.setPrototypeOf(this, GenericError.prototype);
  }

  abstract getHttpStatus(): number;
}

export class BadRequestError extends GenericError {
  getHttpStatus(): number {
    return 400;
  }

  constructor(errorCode: string, systemMessage: string, userMessage?: string) {
    super(errorCode, systemMessage, userMessage);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class UnauthorizedError extends GenericError {
  getHttpStatus(): number {
    return 401;
  }

  constructor(errorCode: string, systemMessage: string, userMessage?: string) {
    super(errorCode, systemMessage, userMessage);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class InternalServerError extends GenericError {
  getHttpStatus(): number {
    return 500;
  }

  constructor(errorCode: string, systemMessage: string, userMessage?: string) {
    super(errorCode, systemMessage, userMessage);

    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}
export class NotFoundError extends GenericError {
  getHttpStatus(): number {
    return 404;
  }

  constructor(errorCode: string, systemMessage: string, userMessage?: string) {
    super(errorCode, systemMessage, userMessage);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
