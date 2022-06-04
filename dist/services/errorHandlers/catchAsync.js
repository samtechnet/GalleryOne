"use strict";
exports.__esModule = true;
exports.string = exports.used = exports.use = void 0;
var use = function (fn) {
    return function (req, res, next) {
        fn(req, res, next)["catch"](next);
    };
};
exports.use = use;
var used = function (fn) {
    return function (req, res, next) {
        fn(req, res, next)["catch"](next);
    };
};
exports.used = used;
var string = function (fn) {
    return function (req, res, next) {
        fn(req, res, next)["catch"](next);
    };
};
exports.string = string;
/*
    const use = fn =>(req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
*/ 
