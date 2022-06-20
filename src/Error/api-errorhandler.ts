import  {  NextFunction, Request, Response } from 'express';
import { AppError } from './ApiError';

const errDev = (err: AppError, res: Response) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: 0,
        message: err.message,
        stack: err.stack
    })
}

const errProd = (err: AppError, res: Response) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: 0,
        message: err.message
    })
}

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    if(process.env.NODE_ENV === 'dev') {
        errDev(err, res);
    }else {
        errProd(err, res);
    }
}
