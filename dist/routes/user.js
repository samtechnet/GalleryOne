"use strict";
exports.__esModule = true;
exports.userRouteDoc = exports.cognito_routes = exports.user_routes = void 0;
var user_1 = require("../controller/user");
//import CognitoService from "../services/cognito-services/cognito-services";
//import AuthCognito from "../controller/Auth/cognito-service";
var cognito_services_1 = require("../services/cognito-services/cognito-services");
var verify_1 = require("../controller/Auth/verify");
//const Auth = new CognitoService();
var user_routes = function (app) {
    app.get("/users", user_1.index),
        app.post("/create", user_1.create),
        app.get("/users/:id", user_1.show),
        app.post("/login", user_1.authenticate);
};
exports.user_routes = user_routes;
var cognito_routes = function (app) {
    app.get("/tes", verify_1.handler),
        app.post("/signIn", cognito_services_1.signIn),
        app.post("/signUp", cognito_services_1.signUp),
        app.post("/confirmSignUp", cognito_services_1.confirmSignUp),
        app.post("/forgotPassword", cognito_services_1.forgotPassword),
        app.post("/resendConfirmationCode", cognito_services_1.resendConfirmationCode);
    app.post("/confirmForgotPassword", cognito_services_1.confirmForgotPassword);
};
exports.cognito_routes = cognito_routes;
var user = [
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
        "data": {
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
];
var listUsers = {
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
                            user: user
                        }
                    }
                }
            }
        }
    }
};
var createUser = {
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
                        example: user[1]
                    }
                }
            }
        }
    }
};
var signInUser = {
    tags: ["User"],
    description: "sign in a user",
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
                        example: user[1]
                    }
                }
            }
        }
    }
};
var userRouteDoc = {
    "/users": {
        get: listUsers
    },
    "/signup": {
        post: createUser
    },
    "/signIn": {
        post: signInUser
    },
    "/confirmSignUp": {
        post: createUser
    },
    "/forgotPassword": {
        post: createUser
    },
    "/resendConfirmationCode": {
        post: createUser
    },
    "/confirmForgotPassword": {
        post: createUser
    }
};
exports.userRouteDoc = userRouteDoc;
