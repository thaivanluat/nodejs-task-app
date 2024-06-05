import httpStatus, { NOT_ACCEPTABLE } from 'http-status';
import errors from 'server/utils/constants/errors';
import BaseError from './BaseError';

export default class NotAcceptable extends BaseError {
  constructor(message: string) {
    super(errors.not_acceptable, NOT_ACCEPTABLE, message || httpStatus['406_MESSAGE']);
  }
}
