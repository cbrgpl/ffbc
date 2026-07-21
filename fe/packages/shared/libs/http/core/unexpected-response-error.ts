import { ApiError } from "./api-error";

type UnexpectedResponseErrorResponse = {
  data: unknown;
  status: number;
  headers: Headers;
};

type JsonValue = Record<string, unknown> | unknown[] | string | number | boolean | null;

const isJson = (value: unknown): value is JsonValue => {
  try {
    JSON.stringify(value);

    return true;
  } catch {
    return false;
  }
};

const getUnexpectedResponseErrorMeta = (data: unknown) => ({
  type: typeof data,
  constructorName: typeof data === "object" && data !== null ? data.constructor?.name : null,
});

const parseUnexpectedResponseErrorBody = (data: unknown): JsonValue => {
  if (isJson(data)) {
    return data;
  }

  return {
    __meta: getUnexpectedResponseErrorMeta(data),
  };
};

export class UnexpectedResponseError extends ApiError {
  readonly response: UnexpectedResponseErrorResponse;
  readonly status: number;
  readonly body: JsonValue;

  constructor(operationId: string, response: UnexpectedResponseErrorResponse) {
    super(operationId, `API operation "${operationId}" returned unexpected status ${response.status}`);

    this.name = "UnexpectedResponseError";
    this.response = response;
    this.status = response.status;
    this.body = parseUnexpectedResponseErrorBody(response.data);
  }
}
