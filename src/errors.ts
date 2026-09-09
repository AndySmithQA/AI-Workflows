export class AppError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
    readonly details?: string[]
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends AppError {
  constructor(details: string[]) {
    super("Validation failed", 400, details);
    this.name = "ValidationError";
  }
}
