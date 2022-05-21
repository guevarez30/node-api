import express from 'express';
import cors from 'cors';

/* Middleware */
import { logger } from './middleware/logger.js';
import { initRoutes } from './routes/routes.js';

export function initApp(DB) {
  /* Express app */
  const app = express();
  app.set('trust proxy', true);
  app.use(cors());
  app.use(express.json());

  /* Custom Middlewares */
  app.use(logger);

  initRoutes({ DB, app });

  const port = 8081;
  app.listen(port);
  console.log(`APP listening on ${port}`);
}
