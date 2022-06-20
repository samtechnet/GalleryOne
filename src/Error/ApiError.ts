export class AppError extends Error {
    constructor(public message: string, public statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        // this.isOperational =  true;

        Error.captureStackTrace(this, this.constructor);
    }
}