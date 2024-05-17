import { logger } from '@utils/index';
import morgan from 'morgan'

export const morganMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    {
      stream: {
        // Configure Morgan to use our custom logger with the http severity
        write: (message: string) => logger.http(message.trim()),
      },
    }
  );