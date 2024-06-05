import httpStatus, { UNSUPPORTED_MEDIA_TYPE } from 'http-status';
import errors from 'server/utils/constants/errors';
import BaseError from './BaseError';

export default class UnsupportedMediaType extends BaseError {
  constructor(message: string) {
    super(
      errors.unsupported_media_type,
      UNSUPPORTED_MEDIA_TYPE,
      message || httpStatus['415_MESSAGE'],
    );
  }
}
