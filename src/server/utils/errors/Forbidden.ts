import httpStatus, { FORBIDDEN } from 'http-status';
import errors from 'server/utils/constants/errors';
import BaseError from './BaseError';

export default class Forbidden extends BaseError {
  constructor(message: string) {
    super(errors.permission_denied, FORBIDDEN, message || httpStatus['403_MESSAGE']);
  }
}
