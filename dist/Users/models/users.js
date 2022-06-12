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
exports.GalleryOneUsers = void 0;
// import the necessary dependencies and connection from the database
var bcrypt_1 = __importDefault(require("bcrypt"));
// @ts-ignore
var database_1 = __importDefault(require("../../database"));
// create a global variable for the pepper on the password
var pepper = process.env.BCRYPT_PASSWORD;
var GalleryOneUsers = /** @class */ (function () {
    function GalleryOneUsers() {
    }
    // read the database
    GalleryOneUsers.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT * FROM users";
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("Cannot get users ".concat(error_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // get a item from the database
    GalleryOneUsers.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'SELECT * FROM users WHERE id=($1)';
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("Could not find users ".concat(id, ", Error: ").concat(error_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // create a new user in the database
    GalleryOneUsers.prototype.create = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, saltRounds, sql, hash, values, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        saltRounds = process.env.SALT_ROUNDS;
                        sql = "INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *";
                        hash = bcrypt_1["default"].hashSync(user.password + pepper, parseInt(saltRounds));
                        values = [user.username, hash];
                        return [4 /*yield*/, connection.query(sql, values)];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("Cannot create new user ".concat(user.username, ". Error: ").concat(error_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // create a method where you compare the hashed password against the password inputed
    GalleryOneUsers.prototype.authenticate = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT password_digest FROM users WHERE username = ($1)";
                        return [4 /*yield*/, connection.query(sql, [username])];
                    case 2:
                        result = _a.sent();
                        if (result.rows.length) {
                            user = result.rows[0];
                            if (bcrypt_1["default"].compareSync(password + pepper, user.password_digest)) {
                                return [2 /*return*/, user];
                            }
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    // update an item in the database by id
    GalleryOneUsers.prototype.update = function (username, password, id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, values, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'UPDATE products SET username = $1 OR password_digest = $2 WHERE id=($3) RETURNING *';
                        values = [username, password, id];
                        return [4 /*yield*/, connection.query(sql, values)];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error("Could not update user ".concat(id, ". Error: ").concat(error_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // delete from the database
    GalleryOneUsers.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, books, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        books = result.rows[0];
                        connection.release();
                        return [2 /*return*/, books];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Could not delete user ".concat(id, ". Error: ").concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return GalleryOneUsers;
}());
exports.GalleryOneUsers = GalleryOneUsers;
