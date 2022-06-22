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
exports.authenticate = exports.show = exports.create = exports.index = void 0;
var user_1 = require("../models/user");
var catchAsync_1 = require("../services/errorHandlers/catchAsync");
var errors_1 = __importDefault(require("../services/errorHandlers/errors"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//import signUp  from "./Auth/cognito-service";
var userstable = new user_1.UserTable();
var secret = String(process.env.TOKEN_SECRET);
var index = (0, catchAsync_1.use)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userstable.index()];
            case 1:
                users = _a.sent();
                if (!users) {
                    throw new errors_1["default"]('Failed to fetch users', 400);
                }
                return [2 /*return*/, res.json({
                        success: true,
                        data: users
                    })];
        }
    });
}); });
exports.index = index;
var create = (0, catchAsync_1.use)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newUser, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    phone_number: req.body.phone_number,
                    date_of_birth: req.body.date_of_birth,
                    home_address: req.body.home_address,
                    password_digest: req.body.password_digest,
                    NIN_number: req.body.nin_number
                };
                return [4 /*yield*/, userstable.create(user)];
            case 1:
                newUser = _a.sent();
                token = jsonwebtoken_1["default"].sign({ user: newUser }, secret);
                if (!newUser) {
                    throw new errors_1["default"]('Failed to insert record!', 400);
                }
                return [2 /*return*/, res.status(200).json({
                        seccess: true,
                        data: token,
                        message: "User created successfully"
                    })];
        }
    });
}); });
exports.create = create;
// const create = async (req: Request, res: Response) => {
//     const user: User = {
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         email: req.body.email,
//         phone_number: req.body.phone_number,
//         date_of_birth: req.body.date_of_birth,
//         home_address: req.body.home_address,
//         password: req.body.password,
//     };
//     try {
//       const newUser = await userstable.create(user);
//       const token = Jwt.sign({ user: newUser }, secret);
//       return res.json(token);
//     } catch (error) {
//       res.status(400);
//       res.json(error);
//     }
// };
var show = (0, catchAsync_1.use)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, userstable.show(id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new errors_1["default"]('Record not found', 404);
                }
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        data: user,
                        messsage: 'Success'
                    })];
        }
    });
}); });
exports.show = show;
var authenticate = (0, catchAsync_1.use)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authenticatedUser, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userstable.authenticate(req.body.email, req.body.password)];
            case 1:
                authenticatedUser = _a.sent();
                token = jsonwebtoken_1["default"].sign({ user: authenticatedUser }, secret);
                if (!authenticatedUser) {
                    throw new errors_1["default"]('Unable to login User', 404);
                }
                return [2 /*return*/, res.status(200).json({
                        data: token,
                        message: "Login success",
                        success: true
                    })];
        }
    });
}); });
exports.authenticate = authenticate;
