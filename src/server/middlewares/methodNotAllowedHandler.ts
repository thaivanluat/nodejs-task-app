import { MethodNotAllowed } from 'server/utils/errors';

const methodNotAllowedHandler = () => {
  throw new MethodNotAllowed('Method not allowed');
};

export default methodNotAllowedHandler;
