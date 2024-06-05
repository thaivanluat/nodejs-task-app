import { Request, Response, NextFunction } from 'express';
import { createSuccessResponse } from 'server/utils/functions';

const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.data) {
    return res
      .status(res.locals.status)
      .json(createSuccessResponse(res.locals.status, res.locals.data));
  }
  return next();
};

export default responseHandler;
