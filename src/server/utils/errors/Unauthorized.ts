import httpStatus, { UNAUTHORIZED } from 'http-status';
import errors from 'server/utils/constants/errors';
import BaseError from './BaseError';

export default class Unauthorized extends BaseError {
  constructor(message: string) {
    super(errors.not_authenticated, UNAUTHORIZED, message || httpStatus['401_MESSAGE']);
  }
}
