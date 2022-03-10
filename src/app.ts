import express, { NextFunction, Request, Response } from 'express';

import 'express-async-errors';
import 'dotenv/config';

import morgan from 'morgan';
import cors from 'cors';

import { routerCreateUser } from './routes/createUser.routes';
import { AppError } from './config/configErrors/AppError';
import { pool } from './config/configDataBase';
import { transporter } from './config/configNodeMailer';

const app = express();

pool.connect();
transporter.verify();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.use(routerCreateUser);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
    return next();
  },
);

export { app };
