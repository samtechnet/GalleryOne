"use strict";
exports.__esModule = true;
exports.ApiErrors = void 0;
var ApiErrors = /** @class */ (function () {
    function ApiErrors(code, message) {
        this.code = code;
        this.message = message;
        this.code = code;
        this.message = message;
    }
    ApiErrors.badRequest = function (msg) {
        return new ApiErrors(400, msg);
    };
    ApiErrors.internalError = function (msg) {
        return new ApiErrors(500, msg);
    };
    return ApiErrors;
}());
exports.ApiErrors = ApiErrors;
