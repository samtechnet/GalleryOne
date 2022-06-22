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
exports.dbConnectionArrayOfValues = exports.dbConnectionWithId = exports.dbConnection = exports.client = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_DB_TEST = _a.POSTGRES_DB_TEST, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, DATABASE_URL = _a.DATABASE_URL, ENV = _a.ENV;
var client;
exports.client = client;
console.log("ENV", ENV);
if (ENV === "test") {
    console.log("I am in test mode");
    exports.client = client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}
if (ENV === "dev") {
    console.log("I am in dev mode");
    exports.client = client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}
;
if (ENV === "prod") {
    console.log("I am in production mode");
    exports.client = client = new pg_1.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    client.query('SELECT table_schema,table_name FROM information_schema.tables;', function (err, res) {
        if (err)
            throw err;
        for (var _i = 0, _a = res.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            console.log(JSON.stringify(row));
        }
        client.end();
    });
}
;
var dbConnection = function (sql) { return __awaiter(void 0, void 0, void 0, function () {
    var conn, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.connect()];
            case 1:
                conn = _a.sent();
                return [4 /*yield*/, conn.query(sql)];
            case 2:
                res = _a.sent();
                conn.release();
                return [2 /*return*/, res];
        }
    });
}); };
exports.dbConnection = dbConnection;
var dbConnectionWithId = function (sql, id) { return __awaiter(void 0, void 0, void 0, function () {
    var conn, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.connect()];
            case 1:
                conn = _a.sent();
                return [4 /*yield*/, conn.query(sql, [id])];
            case 2:
                res = _a.sent();
                conn.release();
                return [2 /*return*/, res];
        }
    });
}); };
exports.dbConnectionWithId = dbConnectionWithId;
var dbConnectionArrayOfValues = function (sql, _a) { return __awaiter(void 0, void 0, void 0, function () {
    var conn, res;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, client.connect()];
            case 1:
                conn = _b.sent();
                return [4 /*yield*/, conn.query(sql, [])];
            case 2:
                res = _b.sent();
                console.log([]);
                conn.release();
                return [2 /*return*/, res];
        }
    });
}); };
exports.dbConnectionArrayOfValues = dbConnectionArrayOfValues;
