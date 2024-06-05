import httpStatus, { BAD_REQUEST } from 'http-status';
import errors from 'server/utils/constants/errors';
import BaseError from './BaseError';

export default class BadRequest extends BaseError {
  constructor(message) {
    super(errors.validation, BAD_REQUEST, message || httpStatus['400_MESSAGE']);
  }
}
