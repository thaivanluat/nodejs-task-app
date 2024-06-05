export default class BaseError extends Error {
  type: string;

  statusCode: number;

  constructor(type: string, statusCode: number, message: string) {
    super();
    this.type = type;
    this.statusCode = statusCode;
    this.message = message;
  }
}
