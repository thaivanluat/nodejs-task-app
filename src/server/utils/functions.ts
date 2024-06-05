import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const createErrorResponse = (statusCode: number, type: string, param: string, message: string) => ({
  status_code: statusCode,
  type,
  param,
  message,
});

const createSuccessResponse = (statusCode: number, data: Object) => ({
  status_code: statusCode,
  data,
});

const getRandomValueFromArray = <Type>(arr: Type[]) => arr[Math.floor(Math.random() * arr.length)];

const dateToUTC = (date: Date) => dayjs.utc(date);

export { createErrorResponse, createSuccessResponse, getRandomValueFromArray, dateToUTC };
