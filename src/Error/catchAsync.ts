import express, { application, NextFunction, Request, Response } from 'express';

// @ts-ignore
export const catchErrors = (fn) => (req: Request, res: Response, next: NextFunction) => 
    fn(req, res, next).catch(next);
