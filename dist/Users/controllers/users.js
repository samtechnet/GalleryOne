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
exports.verifyAuthToken = void 0;
var users_1 = require("../models/users");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var ApiError_1 = require("../../Error/ApiError");
var catchAsync_1 = require("../../Error/catchAsync");
// create an instance of class of users imported
var users = new users_1.GalleryOneUsers();
// method to show all Users in the db
var index = (0, catchAsync_1.catchErrors)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var allUsers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, users.index()];
            case 1:
                allUsers = _a.sent();
                if (!allUsers.length) {
                    throw new ApiError_1.AppError('Record not found', 404);
                }
                return [2 /*return*/, res.json({
                        success: 1,
                        data: allUsers
                    })];
        }
    });
}); });
// method to show a user by id
var show = (0, catchAsync_1.catchErrors)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, singleUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, users.show(id)];
            case 1:
                singleUser = _a.sent();
                if (!singleUser) {
                    throw new ApiError_1.AppError('Record not found', 404);
                }
                return [2 /*return*/, res.json({
                        success: 1,
                        data: singleUser
                    })];
        }
    });
}); });
// method to create a new user in the db
var create = (0, catchAsync_1.catchErrors)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = {
                    username: req.body.username,
                    password: req.body.password
                };
                return [4 /*yield*/, users.create(user)];
            case 1:
                newUser = _a.sent();
                if (!newUser) {
                    throw new ApiError_1.AppError('User details are incomplete', 400);
                }
                console.log(newUser);
                return [2 /*return*/, res.json({
                        message: 'Successfully created',
                        data: newUser
                    })];
        }
    });
}); });
// method to authenticate the user logining in
var authenticate = (0, catchAsync_1.catchErrors)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userAuthenticated, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = {
                    username: req.body.username,
                    password: req.body.password
                };
                if (!user) {
                    throw new ApiError_1.AppError('incomplete details', 400);
                }
                return [4 /*yield*/, users.authenticate(req.body.username, req.body.password)];
            case 1:
                userAuthenticated = _a.sent();
                token = jsonwebtoken_1["default"].sign({ user: userAuthenticated }, process.env.TOKEN_SECRET);
                console.log(token);
                return [2 /*return*/, res.status(201).send('Successfully Login')];
        }
    });
}); });
// method to verify that the user is suing an authorized token
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1];
        var decoded = jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
        if (!decoded) {
            throw new ApiError_1.AppError('Unauthorized user', 401);
        }
        next();
    }
    catch (error) {
        throw new ApiError_1.AppError('Something went wrong', 500);
    }
};
exports.verifyAuthToken = verifyAuthToken;
// method to update a user in the db
var update = (0, catchAsync_1.catchErrors)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, username, password, updatedUser;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, users.update(id, username, password)];
            case 1:
                updatedUser = _b.sent();
                if (!updatedUser) {
                    throw new ApiError_1.AppError('Incomplete details', 400);
                }
                console.log(updatedUser);
                return [2 /*return*/, res.json({
                        message: 'Successfully updated',
                        data: updatedUser
                    })];
        }
    });
}); });
// method to delete a user by id in the db
var deleteUser = (0, catchAsync_1.catchErrors)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, oneUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!id) {
                    throw new ApiError_1.AppError('Invalid ID', 404);
                }
                return [4 /*yield*/, users["delete"](id)];
            case 1:
                oneUser = _a.sent();
                return [2 /*return*/, res.send('Successfully deleted User').status(200)];
        }
    });
}); });
exports["default"] = {
    index: index,
    show: show,
    create: create,
    authenticate: authenticate,
    update: update,
    deleteUser: deleteUser
};
