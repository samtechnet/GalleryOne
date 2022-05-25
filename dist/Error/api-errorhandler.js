"use strict";
exports.__esModule = true;
exports.apiErrorHandler = void 0;
var ApiError_1 = require("./ApiError");
var apiErrorHandler = function (err, req, res, next) {
    console.error(err);
    if (err instanceof ApiError_1.ApiErrors) {
        res.status(err.code).json(err.message);
        return;
    }
    res.status(500).json('something went wrong');
};
exports.apiErrorHandler = apiErrorHandler;
