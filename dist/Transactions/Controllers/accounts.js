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
exports.__esModule = true;
var accounts_1 = require("../Models/accounts");
var ApiError_1 = require("../../Error/ApiError");
var catchAsync_1 = require("../../Error/catchAsync");
// create an instance of the class imported
var accounts = new accounts_1.AllAccounts();
// method to show all accounts in the db
var index = (0, catchAsync_1.catchErrors)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var theAccounts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, accounts.index()];
            case 1:
                theAccounts = _a.sent();
                if (!theAccounts.length) {
                    throw new ApiError_1.AppError('Record not found', 404);
                }
                return [2 /*return*/, res.json({
                        success: 1,
                        data: theAccounts
                    })];
        }
    });
}); });
// method to show an account by id
var show = (0, catchAsync_1.catchErrors)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, myAccount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.params.user_id;
                return [4 /*yield*/, accounts.show(user_id)];
            case 1:
                myAccount = _a.sent();
                if (!myAccount) {
                    throw new ApiError_1.AppError('Record not found', 404);
                }
                return [2 /*return*/, res.json({
                        success: 1,
                        data: myAccount
                    })];
        }
    });
}); });
// method to show an account by id
var showBalance = (0, catchAsync_1.catchErrors)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, myAccount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.params.user_id;
                return [4 /*yield*/, accounts.showBalance(user_id)];
            case 1:
                myAccount = _a.sent();
                if (!myAccount) {
                    throw new ApiError_1.AppError('Record not found', 404);
                }
                return [2 /*return*/, res.json({
                        success: 1,
                        data: myAccount
                    })];
        }
    });
}); });
// method to create a new account in the db
var create = (0, catchAsync_1.catchErrors)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var amount, account, newAccount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                amount = 0;
                account = {
                    user_id: req.body.user_id,
                    accounts_number: req.body.accounts_number,
                    amount: amount,
                    balance: req.body.balance
                };
                return [4 /*yield*/, accounts.create(account)];
            case 1:
                newAccount = _a.sent();
                if (!newAccount) {
                    throw new ApiError_1.AppError('Product details are incomplete', 400);
                }
                return [2 /*return*/, res.json({
                        message: 'Successfully created',
                        data: newAccount
                    })];
        }
    });
}); });
// method to update an account in the db
var debitAccount = (0, catchAsync_1.catchErrors)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var account, myAccounts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                account = {
                    user_id: req.body.user_id,
                    accounts_number: req.body.accounts_number,
                    amount: req.body.amount - req.body.amount,
                    balance: req.body.balance - req.body.amount
                };
                return [4 /*yield*/, accounts.debitAccount(account)];
            case 1:
                myAccounts = _a.sent();
                if (!myAccounts) {
                    throw new ApiError_1.AppError('Account details are incomplete', 400);
                }
                return [2 /*return*/, res.json({
                        message: 'Succesfully updated',
                        data: myAccounts
                    })];
        }
    });
}); });
// method to update an account in the db
var creditAccount = (0, catchAsync_1.catchErrors)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var account, myAccounts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                account = {
                    user_id: req.body.user_id,
                    accounts_number: req.body.accounts_number,
                    amount: req.body.amount - req.body.amount,
                    balance: req.body.balance + req.body.amount
                };
                return [4 /*yield*/, accounts.creditAccount(account)];
            case 1:
                myAccounts = _a.sent();
                if (!myAccounts) {
                    throw new ApiError_1.AppError('Account details are incomplete', 400);
                }
                return [2 /*return*/, res.json({
                        message: 'Succesfully updated',
                        data: myAccounts
                    })];
        }
    });
}); });
// method to delete a account by id in the db
var deleteAccount = (0, catchAsync_1.catchErrors)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, myProducts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.params.id;
                return [4 /*yield*/, accounts["delete"](user_id)];
            case 1:
                myProducts = _a.sent();
                if (!user_id) {
                    throw new ApiError_1.AppError('Product not found: Invalid ID', 404);
                }
                return [2 /*return*/, res.status(200).send('Successfully Deleted')];
        }
    });
}); });
exports["default"] = {
    index: index,
    show: show,
    showBalance: showBalance,
    create: create,
    creditAccount: creditAccount,
    debitAccount: debitAccount,
    deleteAccount: deleteAccount
};
