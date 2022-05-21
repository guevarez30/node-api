import Response from '../classes/response.js';
import { notifier } from '../utils/notifer.js';

const buildErrorReport = ({ error, req }) => {
  const completed = new Date();
  const responseTime = completed.getTime() - req.start.getTime();
  const ERROR = {
    url: req.originalUrl,
    method: req.method,
    started: req.start,
    user: req.user?.id,
    completed: completed,
    responseTime: responseTime,
    error: error,
  };
  return ERROR;
};

export function routeError({ error, req }) {
  if (!Response.isResponse(error)) {
    const ERROR = buildErrorReport({ error, req });
    notifier.error(ERROR);
    return Response.error('Internal Server Error');
  }
  return error;
}
