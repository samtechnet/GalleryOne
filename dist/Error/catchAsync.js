"use strict";
exports.__esModule = true;
exports.catchErrors = void 0;
// @ts-ignore
var catchErrors = function (fn) { return function (req, res, next) {
    return fn(req, res, next)["catch"](next);
}; };
exports.catchErrors = catchErrors;
