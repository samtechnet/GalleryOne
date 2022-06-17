import express from "express";
import { index, create, show, authenticate } from "../controller/user";
//import CognitoService from "../services/cognito-services/cognito-services";
//import AuthCognito from "../controller/Auth/cognito-service";
import { signUp, confirmSignUp, signIn,forgotPassword,resendConfirmationCode,confirmForgotPassword, test } from "../services/cognito-services/cognito-services";
import verifyAuthToken from "../controller/Auth/verifyAuthToken";
import { handler } from "../controller/Auth/verify"



//const Auth = new CognitoService();
const user_routes = (app: express.Application) => {
    app.get("/users", index),
        app.post("/create", create),
        app.get("/users/:id", show),
        app.post("/login", authenticate)
        
};
const cognito_routes = (app: express.Application) => {
    app.get("/tes", handler),
    app.post("/signIn", signIn),
    app.post("/signUp", signUp),
    app.post("/confirmSignUp", confirmSignUp),    
    app.post("/forgotPassword", forgotPassword),
    app.post("/resendConfirmationCode", resendConfirmationCode)
    app.post("/confirmForgotPassword", confirmForgotPassword)
}


export {user_routes,cognito_routes} ;

