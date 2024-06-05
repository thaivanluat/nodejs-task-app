import httpStatus, { NOT_FOUND } from 'http-status';
import errors from 'server/utils/constants/errors';
import BaseError from './BaseError';

export default class NotFound extends BaseError {
  constructor(message: string) {
    super(errors.not_found, NOT_FOUND, message || httpStatus['404_MESSAGE']);
  }
}
