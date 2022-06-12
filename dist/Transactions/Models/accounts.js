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
exports.AllAccounts = void 0;
// import the client connection from the database file
// @ts-ignore
var database_1 = __importDefault(require("../../database"));
// create and export a class for all CRUD actions
var AllAccounts = /** @class */ (function () {
    function AllAccounts() {
    }
    // return all accounts
    AllAccounts.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        sql = "SELECT * FROM accounts";
                        return [4 /*yield*/, connection.query(sql)];
                    case 3:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows];
                    case 4:
                        error_1 = _a.sent();
                        throw new Error("Cannot get accounts ".concat(error_1));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // get an item from the database
    AllAccounts.prototype.show = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        sql = 'SELECT * FROM accounts WHERE user_id=($1)';
                        return [4 /*yield*/, connection.query(sql, [user_id])];
                    case 3:
                        result = _a.sent();
                        connection.release();
                        console.log(result.rows[0].balance);
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        error_2 = _a.sent();
                        throw new Error("Could not find accounts ".concat(user_id, ", Error: ").concat(error_2));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // get the balance from the database
    AllAccounts.prototype.showBalance = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        sql = 'SELECT * FROM accounts WHERE user_id=($1)';
                        return [4 /*yield*/, connection.query(sql, [user_id])];
                    case 3:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0].balance];
                    case 4:
                        error_3 = _a.sent();
                        throw new Error("Could not get balance ".concat(user_id, ", Error: ").concat(error_3));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // create new account
    AllAccounts.prototype.create = function (accounts) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, text, values, res, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        text = "INSERT INTO accounts(accounts_number, balance, amount, user_id) VALUES($1, $2, $3, $4) RETURNING *";
                        values = [accounts.accounts_number, accounts.balance, accounts.amount, accounts.user_id];
                        return [4 /*yield*/, connection.query(text, values)];
                    case 3:
                        res = _a.sent();
                        console.log(res.rows[0]);
                        return [2 /*return*/, res.rows[0]];
                    case 4:
                        error_4 = _a.sent();
                        throw new Error("could not create new account in the db ".concat(error_4));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // debit an item in the database by id
    AllAccounts.prototype.debitAccount = function (accounts) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, begin, sql, values, result, commit, error_5, rollback;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 8]);
                        return [4 /*yield*/, connection.query('BEGIN')];
                    case 3:
                        begin = _a.sent();
                        sql = "UPDATE accounts SET balance = $1, amount = $2, user_id = $3 WHERE accounts_number = $4 RETURNING *";
                        values = [accounts.balance, accounts.amount, accounts.user_id, accounts.accounts_number];
                        return [4 /*yield*/, connection.query(sql, values)];
                    case 4:
                        result = _a.sent();
                        return [4 /*yield*/, connection.query('COMMIT')];
                    case 5:
                        commit = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 6:
                        error_5 = _a.sent();
                        return [4 /*yield*/, connection.query('ROLLBACK')];
                    case 7:
                        rollback = _a.sent();
                        throw new Error("Could not update account ".concat(accounts.accounts_number, ". Error: ").concat(error_5));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // credit an account in the database by id
    AllAccounts.prototype.creditAccount = function (accounts) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, begin, sql, values, result, commit, error_6, rollback;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 8]);
                        return [4 /*yield*/, connection.query('BEGIN')];
                    case 3:
                        begin = _a.sent();
                        sql = "UPDATE accounts SET balance = $1, amount = $2, user_id = $3 WHERE accounts_number = $4 RETURNING *";
                        values = [accounts.balance, accounts.amount, accounts.user_id, accounts.accounts_number];
                        return [4 /*yield*/, connection.query(sql, values)];
                    case 4:
                        result = _a.sent();
                        return [4 /*yield*/, connection.query('COMMIT')];
                    case 5:
                        commit = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 6:
                        error_6 = _a.sent();
                        return [4 /*yield*/, connection.query('ROLLBACK')];
                    case 7:
                        rollback = _a.sent();
                        throw new Error("Could not update account ".concat(accounts.accounts_number, ". Error: ").concat(error_6));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // delete from the database
    AllAccounts.prototype["delete"] = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, books, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'DELETE FROM accounts WHERE user_id=($1) RETURNING *';
                        return [4 /*yield*/, connection.query(sql, [user_id])];
                    case 2:
                        result = _a.sent();
                        books = result.rows[0];
                        connection.release();
                        return [2 /*return*/, books];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Could not delete product ".concat(user_id, ". Error: ").concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AllAccounts;
}());
exports.AllAccounts = AllAccounts;
