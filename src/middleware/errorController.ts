import express, { NextFunction, Request, Response } from "express";
import AppError from "../services/errorHandlers/errors"
import dotenv from "dotenv";
dotenv.config();

const sendErrorDev = (err: AppError, res: Response) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack,
    })
}

const sendErrorProd = (err: AppError, res: Response,) => {
    const statusCode = err.statusCode || 500;
    if (err.isOperational) {
        res.status(statusCode).json({
            success: false,
            message: err.message,
            stack: err.stack,
            name: err.name,
            operation: err.isOperational,
            
        }) 
        console.log(err)
    } else {
        res.status(statusCode).json({
            success: false,
            message:"Something went wrong, please contact Admin",
        })
    }
  
}

const errorController = (err: AppError,req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === "dev") {
        sendErrorDev(err, res);
    } else {
        sendErrorProd(err, res);
    }
}

export {errorController} ;