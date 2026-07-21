export class ApiError extends Error {
  readonly operationId: string;

  constructor(operationId: string, message: string, options?: ErrorOptions) {
    super(message, options);

    this.name = "ApiError";
    this.operationId = operationId;
  }
}
