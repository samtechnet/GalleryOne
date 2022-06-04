import express from "express";
import { index, create, show, authenticate } from "../controller/user";
//import CognitoService from "../services/cognito-services/cognito-services";
//import AuthCognito from "../controller/Auth/cognito-service";
import { signUp, confirmSignUp, signIn,forgotPassword,resendConfirmationCode,confirmForgotPassword, test } from "../services/cognito-services/cognito-services";
import verifyAuthToken from "../controller/Auth/verifyAuthToken";

//const Auth = new CognitoService();
const user_routes = (app: express.Application) => {
    app.get("/users", index),
        app.post("/create", create),
        app.get("/users/:id", show),
        //
        app.post("/signUp", signUp),
        app.post("/confirmSignUp", confirmSignUp),
        app.post("/login", authenticate),
        app.post("/signIn", signIn),
        
        app.post("/forgotPassword", forgotPassword),
        app.post("/resendConfirmationCode", resendConfirmationCode)
};
const cognito_routes = (app: express.Application) => {
    app.get("/tes",verifyAuthToken, test),
    app.post("/confirmForgotPassword", confirmForgotPassword)
}
export {user_routes,cognito_routes} ;
