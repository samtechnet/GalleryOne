

class AppError extends Error {
    statusCode: any;
    isOperational: boolean;
    constructor(message: string | undefined, statusCode: any) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor)
    }
}
 
export default AppError;