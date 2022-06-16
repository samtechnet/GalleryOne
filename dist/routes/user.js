"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.cognito_routes = exports.user_routes = void 0;
var user_1 = require("../controller/user");
//import CognitoService from "../services/cognito-services/cognito-services";
//import AuthCognito from "../controller/Auth/cognito-service";
var cognito_services_1 = require("../services/cognito-services/cognito-services");
var verifyAuthToken_1 = __importDefault(require("../controller/Auth/verifyAuthToken"));
//const Auth = new CognitoService();
var user_routes = function (app) {
    app.get("/users", user_1.index),
        app.post("/create", user_1.create),
        app.get("/users/:id", user_1.show),
        app.post("/login", user_1.authenticate);
};
exports.user_routes = user_routes;
var cognito_routes = function (app) {
    app.get("/tes", verifyAuthToken_1["default"], cognito_services_1.test),
        app.post("/signIn", cognito_services_1.signIn),
        app.post("/signUp", cognito_services_1.signUp),
        app.post("/confirmSignUp", cognito_services_1.confirmSignUp),
        app.post("/forgotPassword", cognito_services_1.forgotPassword),
        app.post("/resendConfirmationCode", cognito_services_1.resendConfirmationCode);
    app.post("/confirmForgotPassword", cognito_services_1.confirmForgotPassword);
};
exports.cognito_routes = cognito_routes;
