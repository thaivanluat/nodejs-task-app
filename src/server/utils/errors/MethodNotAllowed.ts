import httpStatus, { METHOD_NOT_ALLOWED } from 'http-status';
import errors from 'server/utils/constants/errors';
import BaseError from './BaseError';

export default class MethodNotAllowed extends BaseError {
  constructor(message: string) {
    super(errors.method_not_allowed, METHOD_NOT_ALLOWED, message || httpStatus['405_MESSAGE']);
  }
}
