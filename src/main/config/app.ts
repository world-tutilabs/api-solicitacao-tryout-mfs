import Express, { NextFunction, Request, Response } from 'express'
import "express-async-errors";
import { AppError } from '../../presentation/errors/AppError';
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'

const app = Express()

  
setupMiddlewares(app)
setupRoutes(app)

app.use(
  (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    if (error instanceof AppError) {
      console.log(error.message);
      
      return response
        .status(error.statusCode)
        .json({ message: error.message }).send();
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${error.message}`,
    });
  },
);


export default app