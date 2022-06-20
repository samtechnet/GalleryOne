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

const user = [
    {
        "success": true,
        "data": [
            {
                "id": 1,
                "first_name": "samuel",
                "last_name": "omolaja",
                "email": "samlaja1292@gmail.com",
                "password_digest": "password123",
                "phone_number": "8161228946",
                "home_address": "Agege",
                "nin_number": 123456,
                "date_of_birth": "1992-12-01T23:00:00.000Z"
            },
        
        ]
    },

    {
        "success": true,
        "data": 
            {
                "id": 17,
                "first_name": "Adekey",
                "last_name": "Timothy",
                "email": "gimigit204@runqx.com",
                "password_digest": "$2b$04$65uP1dcAWauI5mXfOLZdwuv.rUDiLAs8FqfwxIEFirkvjZdsMMYoG",
                "phone_number": "2348179911535",
                "home_address": "null",
                "nin_number": "null",
                "date_of_birth": "null"
            },
        "awsData": {
            "$metadata": {
                "httpStatusCode": 200,
                "requestId": "6dc10037-88a9-4ef1-b4f7-bf73a71accaf",
                "attempts": 1,
                "totalRetryDelay": 0
            },
            "CodeDeliveryDetails": {
                "AttributeName": "email",
                "DeliveryMedium": "EMAIL",
                "Destination": "g***@r***"
            },
            "UserConfirmed": false,
            "UserSub": "1a23d266-ea78-4fc2-b951-91327dd33ab2"
        },
        "response": "User created successfully, please check your email for confirmation code"

    
    },
]
const listUsers = 
    {
        tags: ["User"],
        description: "List all of the users",
        responses: {
            200: {
                description: "Ok",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            example: {
                                count: 1,
                                user
                            },
                        }
                    }
                }
            }
        }
}

const createUser = {
    tags: ["User"],
    description: "Create a user",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        email: {
                            type: "string",
                            description: "Email of the user",
                            example: "samlaja1292@gmail.com"
                        },
                        first_name: {
                            type: "string",
                            description: "first name of the user",
                            example: "Samuel"
                        },
                        last_name: {
                            type: "string",
                            description: "Last name or surname of the user",
                            example: "Omolaja"
                        },
                        phone_number: {
                            type: "string",
                            description: "mobile phone number of the user",
                            example: "+2348161228946"
                        },
                        password: {
                            type: "string",
                            description: "A unique password of the user with a combination of capital letter, small letter, numbers and signs",
                            example: "Password123@."
                        }
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: "Ok",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: user[1],
                    }
                }
            }
        }
    }
}

const userRouteDoc = {
    "/users": {
        get: listUsers,
        post: createUser,
        }
}



export {user_routes,cognito_routes, userRouteDoc} ;

