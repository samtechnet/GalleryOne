"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var sendErrorDev = function (err, res) {
    var statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack
    });
};
var sendErrorProd = function (err, res) {
    var statusCode = err.statusCode || 500;
    if (err.isOperational) {
        res.status(statusCode).json({
            success: false,
            message: err.stack
        });
    }
    else {
        res.status(statusCode).json({
            success: false,
            message: "Something went wrong, please contact Admin"
        });
    }
};
var errorController = function (err, req, res, next) {
    if (process.env.NODE_ENV === "dev") {
        sendErrorDev(err, res);
    }
    else {
        sendErrorProd(err, res);
    }
};
exports["default"] = errorController;
