import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import 'express-async-errors';
import 'reflect-metadata';
import '@shared/infra/typeorm';
import { isCelebrateError } from 'celebrate';

import AppError from '@shared/errorsHandlers/AppError';
import routes from '@shared/infra/http/routes/index';

const app = express();

app.use(express.json());

app.use(routes);

app.use((err: any, request: Request, response: Response, _: NextFunction) => {
  console.log(err);

  if (isCelebrateError(err)) {
    const obj: any = Array.from(err.details.entries()).reduce(
      (main, [key, value]) => ({ ...main, [key]: value }),
      {},
    );

    return response.status(400).json({
      status: 400,
      data: {
        message: obj.body.details[0].message,
      },
    });
  }

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: err.statusCode,
      data: { message: err.message },
    });
  }

  return response.status(500).json({
    status: 500,
    data: { message: 'Internal server error', ...err },
  });
});

app.listen(5000, () => {
  console.log('Server started on port 5000!');
});
