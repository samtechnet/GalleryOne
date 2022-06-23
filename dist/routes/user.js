"use strict";
exports.__esModule = true;
exports.serverRouteDoc = exports.userRouteDoc = exports.cognito_routes = exports.user_routes = void 0;
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
var test = [];
var user = [
    {
        "success": true,
        "data": [
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
                    {
                        "id": 3,
                        "first_name": "samuel",
                        "last_name": "omolaja",
                        "email": "samlaja129@gmail.com",
                        "password_digest": "password123",
                        "phone_number": "8161228949",
                        "home_address": "Agege",
                        "nin_number": 123456,
                        "date_of_birth": "1992-12-01T23:00:00.000Z"
                    },
                    {
                        "id": 4,
                        "first_name": "samuel",
                        "last_name": "omolaja",
                        "email": "samlaja12@gmail.com",
                        "password_digest": "password123",
                        "phone_number": "8161228947",
                        "home_address": "Agege",
                        "nin_number": null,
                        "date_of_birth": "1992-12-01T23:00:00.000Z"
                    },
                    {
                        "id": 5,
                        "first_name": "samuel",
                        "last_name": "omolaja",
                        "email": "samlaja12924@gmail.com",
                        "password_digest": "$2a$04$asNd8w5SMkd5uho1B2NZReOSDgZz7VU0VfuTiQYq70.BZLcYeQGui",
                        "phone_number": "8161228941",
                        "home_address": "agege",
                        "nin_number": null,
                        "date_of_birth": "1992-12-01T23:00:00.000Z"
                    },
                    {
                        "id": 6,
                        "first_name": "samuel",
                        "last_name": "omolaja",
                        "email": "samlajo12924@gmail.com",
                        "password_digest": "$2a$04$sJEhFrTHariP6uyJ7vPGyueEbu2jIp7VKMapBMWBaczmWJ7yp9sSC",
                        "phone_number": "8161227941",
                        "home_address": "agege",
                        "nin_number": null,
                        "date_of_birth": "1992-12-01T23:00:00.000Z"
                    },
                    {
                        "id": 10,
                        "first_name": "yacojo6491@oceore.com",
                        "last_name": "Samuel",
                        "email": "Omolaje",
                        "password_digest": "$2b$04$qN.1j/7hwFf2a4QlH37SmOID3Zw2SaWXMiEF20epLRjSyR23RPCha",
                        "phone_number": "2348161228946",
                        "home_address": null,
                        "nin_number": null,
                        "date_of_birth": null
                    },
                    {
                        "id": 12,
                        "first_name": "Adekeye",
                        "last_name": "Timothy",
                        "email": "adekeyetimothy290@gmail.com",
                        "password_digest": "$2b$04$8yObvuFyY.AhaKYopGND7uDOSwKYlUhNVWu3vYcpzvaJWkHxSXdiW",
                        "phone_number": "2348179911517",
                        "home_address": null,
                        "nin_number": null,
                        "date_of_birth": null
                    },
                    {
                        "id": 15,
                        "first_name": "Adekey",
                        "last_name": "Timothy",
                        "email": "adekeyetimothy9@gmail.com",
                        "password_digest": "$2b$04$tf.a/H88IRIEOdJj9g69POns/LxsGSXtA5imWk2uTTGqs797CvgDS",
                        "phone_number": "2348179911518",
                        "home_address": null,
                        "nin_number": null,
                        "date_of_birth": null
                    },
                    {
                        "id": 17,
                        "first_name": "Adekey",
                        "last_name": "Timothy",
                        "email": "gimigit204@runqx.com",
                        "password_digest": "$2b$04$65uP1dcAWauI5mXfOLZdwuv.rUDiLAs8FqfwxIEFirkvjZdsMMYoG",
                        "phone_number": "2348179911535",
                        "home_address": null,
                        "nin_number": null,
                        "date_of_birth": null
                    },
                    {
                        "id": 18,
                        "first_name": "Samuel",
                        "last_name": "Omolaja",
                        "email": "namacab552@mahazai.com",
                        "password_digest": "$2b$04$vubCFgX5i2ko0KiMj1wiTeMhQ.llwbXv2PTMGvBCw6sHSQrsyTG6e",
                        "phone_number": "2348161228976",
                        "home_address": null,
                        "nin_number": null,
                        "date_of_birth": null
                    }
                ]
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
    {
        "success": true,
        "message": "Hurray! your email is valid and you are now a registered user",
        "data": {
            "$metadata": {
                "httpStatusCode": 200,
                "requestId": "9cbf1893-fef6-43a9-924e-fefb58ff42f8",
                "attempts": 1,
                "totalRetryDelay": 0
            }
        }
    },
];
var server = {
    tags: ["server"],
    description: "test and get a response from server",
    responses: {
        200: {
            description: "Ok",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: user[0]
                    }
                }
            }
        }
    }
};
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
                        example: user[0]
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
                            example: "namacab552@mahazai.com"
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
                            example: "+2348161228976"
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
var confirmSignUpCode = {
    tags: ["User"],
    description: "User need to confirm the validity of their email before they can sign in",
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
                        ConfirmCode: {
                            type: "string",
                            description: "A timed based 6 digit code sent to user provided email during sign up",
                            example: "687789"
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
                        example: user[2]
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
    "/signUp": {
        post: createUser
    },
    "/signIn": {
        post: signInUser
    },
    "/confirmSignUp": {
        post: confirmSignUpCode
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
var serverRouteDoc = {
    "/galleryone": {
        get: server
    }
};
exports.serverRouteDoc = serverRouteDoc;
