import { NOT_FOUND } from 'http-status';
import { Request, Response } from 'express';
import errors from 'server/utils/constants/errors';
import { createErrorResponse } from 'server/utils/functions';

const pageNotFoundHandler = (req: Request, res: Response) =>
  res
    .status(NOT_FOUND)
    .json(createErrorResponse(NOT_FOUND, errors.not_found, undefined, '404 - Page not found'));

export default pageNotFoundHandler;
