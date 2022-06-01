"use strict";
exports.__esModule = true;
exports.errorHandler = void 0;
var errDev = function (err, res) {
    var statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: 0,
        message: err.message,
        stack: err.stack
    });
};
var errProd = function (err, res) {
    var statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: 0,
        message: err.message
    });
};
var errorHandler = function (err, req, res, next) {
    if (process.env.NODE_ENV === 'dev') {
        errDev(err, res);
    }
    else {
        errProd(err, res);
    }
};
exports.errorHandler = errorHandler;
