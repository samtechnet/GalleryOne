import express, { NextFunction, Request, Response } from 'express';
import { ApiErrors } from './ApiError';

export const apiErrorHandler = (err: ApiErrors, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (err instanceof ApiErrors) {
        res.status(err.code).json(err.message);
        return;
    }

    res.status(500).json('something went wrong');

}