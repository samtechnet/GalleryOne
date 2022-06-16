"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.test = exports.confirmForgotPassword = exports.resendConfirmationCode = exports.forgotPassword = exports.signIn = exports.confirmSignUp = exports.signUp = void 0;
// import AmazonCognitoIdentity, { CognitoAccessToken } from "amazon-cognito-identity-js";
var errors_1 = __importDefault(require("../../services/errorHandlers/errors"));
var client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
var bcrypt_1 = __importDefault(require("bcrypt"));
var database_1 = require("../database/database");
var catchAsync_1 = require("../../services/errorHandlers/catchAsync");
var crypto_1 = __importDefault(require("crypto"));
var clients = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({ region: "us-east-1" });
var SSOClient = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({ region: "us-east-1" });
var clientId = String(process.env.ClientId);
var SecretKey = String(process.env.SecretKey);
var saltRounds = Number(process.env.SALT_ROUNDS);
var pepper = String(process.env.BCRYPT_PASSWORD);
function generateHash(username) {
    var hashKey = crypto_1["default"].createHmac("SHA256", SecretKey)
        .update(username + clientId).digest('base64').toString();
    return hashKey;
}
var signUp = (0, catchAsync_1.use)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, first_name, last_name, phone_number, password, userAttr, hashPassword, params, command, data, conn, sql, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, first_name = _a.first_name, last_name = _a.last_name, phone_number = _a.phone_number, password = _a.password;
                userAttr = [];
                // userAttr.push({ Name: 'username', Value: first_name });
                // userAttr.push({ Name: 'last_name', Value: last_name });
                userAttr.push({ Name: 'phone_number', Value: phone_number });
                return [4 /*yield*/, bcrypt_1["default"].hash(password + pepper, saltRounds)];
            case 1:
                hashPassword = _b.sent();
                params = {
                    Username: email,
                    Password: hashPassword,
                    ClientId: clientId,
                    UserAttributes: userAttr,
                    SecretHash: generateHash(email)
                };
                !params && res.status(401).json("wrong credentials");
                command = new client_cognito_identity_provider_1.SignUpCommand(params);
                return [4 /*yield*/, clients.send(command)];
            case 2:
                data = _b.sent();
                if (!data) {
                    res.status(401).end();
                }
                return [4 /*yield*/, database_1.client.connect()];
            case 3:
                conn = _b.sent();
                sql = "INSERT INTO users (first_name,last_name,email,phone_number, password_digest) VALUES ($1, $2, $3, $4, $5) RETURNING *";
                return [4 /*yield*/, conn.query(sql, [first_name, last_name, email, phone_number, hashPassword,])];
            case 4:
                result = _b.sent();
                conn.release();
                if (result) {
                    return [2 /*return*/, res.status(200).json({
                            success: true,
                            data: result.rows[0],
                            awsData: data,
                            response: "User created successfully, please check your email for confirmation code"
                        })];
                }
                else {
                    res.json({
                        status: false,
                        response: "Unsuccessful attempt to register user"
                    }).status(401);
                }
                throw new errors_1["default"]("something went wrong", 400);
        }
    });
}); });
exports.signUp = signUp;
var confirmSignUp = (0, catchAsync_1.used)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, ConfirmCode, input, command, response;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, ConfirmCode = _a.ConfirmCode;
                input = {
                    Username: email,
                    ConfirmationCode: ConfirmCode,
                    ClientId: clientId,
                    SecretHash: generateHash(email)
                };
                command = new client_cognito_identity_provider_1.ConfirmSignUpCommand(input);
                return [4 /*yield*/, clients.send(command)];
            case 1:
                response = _b.sent();
                if (response) {
                    return [2 /*return*/, res.json({
                            success: true,
                            message: "Hurray! your email is valid and you are now a registered user",
                            data: response
                        }).statusCode];
                }
                return [2 /*return*/];
        }
    });
}); });
exports.confirmSignUp = confirmSignUp;
var resendConfirmationCode = (0, catchAsync_1.used)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, phone_number, userAttr, input, command, response;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, phone_number = _a.phone_number;
                userAttr = [];
                //console.log(userAttr);
                // userAttr.push({ Name: 'first_name', Value: first_name });
                // userAttr.push({ Name: 'last_name', Value: last_name });
                userAttr.push({ Name: 'phone_number', Value: phone_number });
                input = {
                    Username: email,
                    ClientId: clientId,
                    UserAttributes: userAttr,
                    SecretHash: generateHash(email)
                };
                command = new client_cognito_identity_provider_1.ResendConfirmationCodeCommand(input);
                return [4 /*yield*/, clients.send(command)];
            case 1:
                response = _b.sent();
                if (response) {
                    return [2 /*return*/, res.json({
                            success: true,
                            message: response
                        }).statusCode];
                }
                return [2 /*return*/];
        }
    });
}); });
exports.resendConfirmationCode = resendConfirmationCode;
var signIn = (0, catchAsync_1.used)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, username, input, command, response;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                username = email;
                input = {
                    AuthFlow: "USER_PASSWORD_AUTH",
                    AuthParameters: {
                        "USERNAME": username,
                        "PASSWORD": password,
                        "SECRET_HASH": generateHash(username)
                    },
                    ClientId: clientId
                };
                command = new client_cognito_identity_provider_1.InitiateAuthCommand(input);
                return [4 /*yield*/, clients.send(command)];
            case 1:
                response = _b.sent();
                if (response) {
                    return [2 /*return*/, res.json({
                            success: true,
                            message: response.AuthenticationResult
                        }).statusCode];
                }
                console.log(response);
                return [2 /*return*/];
        }
    });
}); });
exports.signIn = signIn;
var deleteUser = (0, catchAsync_1.numberVoid)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authorizationHeader, token, input, command, response, conn, sql;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authorizationHeader = req.headers.authorization;
                if (!authorizationHeader) return [3 /*break*/, 4];
                token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(" ")[1];
                input = {
                    AccessToken: token
                };
                command = new client_cognito_identity_provider_1.DeleteUserCommand(input);
                return [4 /*yield*/, clients.send(command)];
            case 1:
                response = _a.sent();
                console.log(response);
                if (!response) return [3 /*break*/, 3];
                return [4 /*yield*/, database_1.client.connect()];
            case 2:
                conn = _a.sent();
                sql = "DELETE FROM users WHERE email=$1";
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4: return [2 /*return*/, res.status(401).json("Token is not valid")];
            case 5: return [2 /*return*/];
        }
    });
}); });
var signOut = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, input;
    return __generator(this, function (_b) {
        _a = req.body;
        input = {
        // AccessToken: accessToken
        };
        return [2 /*return*/];
    });
}); };
var forgotPassword = (0, catchAsync_1.string)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, input, command, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                input = {
                    Username: email,
                    ClientId: clientId,
                    SecretHash: generateHash(email)
                };
                command = new client_cognito_identity_provider_1.ForgotPasswordCommand(input);
                return [4 /*yield*/, clients.send(command)];
            case 1:
                response = _a.sent();
                if (response) {
                    return [2 /*return*/, res.json({
                            success: true,
                            message: "Check your mail for a password reset code",
                            data: response.CodeDeliveryDetails
                        }).statusCode];
                }
                return [2 /*return*/];
        }
    });
}); });
exports.forgotPassword = forgotPassword;
var confirmForgotPassword = (0, catchAsync_1.string)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, newpassword, code, hashPassword, input, command, response, conn, sql, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, newpassword = _a.newpassword, code = _a.code;
                return [4 /*yield*/, bcrypt_1["default"].hash(newpassword + pepper, saltRounds)];
            case 1:
                hashPassword = _b.sent();
                input = {
                    Username: email,
                    Password: hashPassword,
                    ConfirmationCode: code,
                    ClientId: clientId,
                    SecretHash: generateHash(email)
                };
                command = new client_cognito_identity_provider_1.ConfirmForgotPasswordCommand(input);
                return [4 /*yield*/, clients.send(command)];
            case 2:
                response = _b.sent();
                if (!response) {
                    res.status(401).end();
                }
                return [4 /*yield*/, database_1.client.connect()];
            case 3:
                conn = _b.sent();
                sql = "UPDATE users SET password_digest= $1 WHERE email=$2";
                return [4 /*yield*/, conn.query(sql, [email, hashPassword,])];
            case 4:
                result = _b.sent();
                conn.release();
                if (result) {
                    return [2 /*return*/, res.status(200).json({
                            success: true,
                            data: result.rows[0],
                            awsData: response.$metadata,
                            response: "successfully changed your password"
                        }).statusCode];
                }
                else {
                    res.json({
                        status: false,
                        response: "Unseccfully attempt to change password"
                    }).status(401);
                }
                throw new errors_1["default"]("something went wrong", 400);
        }
    });
}); });
exports.confirmForgotPassword = confirmForgotPassword;
var test = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, res.json(" testing is okay ")];
    });
}); };
exports.test = test;
