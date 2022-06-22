"use strict";
exports.__esModule = true;
exports.numberVoid = exports.image = exports.string = exports.used = exports.use = void 0;
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
var numberVoid = function (fn) {
    return function (req, res, next) {
        fn(req, res, next)["catch"](next);
    };
};
exports.numberVoid = numberVoid;
var string = function (fn) {
    return function (req, res, next) {
        fn(req, res, next)["catch"](next);
    };
};
exports.string = string;
var image = function (fn) {
    return function (req, res, next) {
        fn(req, res, next)["catch"](next);
    };
};
exports.image = image;
/*
    const use = fn =>(req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
*/ 
