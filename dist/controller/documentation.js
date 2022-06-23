"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var user_1 = require("../routes/user");
var swaggerDocumentation = {
    openapi: "3.0.0",
    info: {
        title: "GalleryOne-App",
        version: "1.0.0",
        description: "This is backend api for Galleryone app"
    },
    servers: [
        {
            url: "http://localhost:5000",
            description: "Local Dev"
        },
        {
            url: "https://gallery-one.herokuapp.com/",
            description: "Production Dev"
        },
    ],
    tags: [
        {
            name: "User",
            description: "User routes"
        },
        {
            name: "Server",
            description: "Server routes"
        },
    ],
    paths: __assign(__assign({}, user_1.userRouteDoc), user_1.serverRouteDoc)
};
exports["default"] = swaggerDocumentation;
