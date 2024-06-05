import httpStatus, { TOO_MANY_REQUESTS } from 'http-status';
import errors from 'server/utils/constants/errors';
import BaseError from './BaseError';

export default class Throttled extends BaseError {
  constructor(message: string) {
    super(errors.throttled, TOO_MANY_REQUESTS, message || httpStatus['429_MESSAGE']);
  }
}
