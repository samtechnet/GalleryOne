"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// import the necessary dependencies
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
// initialize evnvironment variables
dotenv_1["default"].config();
// reference the variables in the .env folder
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_TEST_DB = _a.POSTGRES_TEST_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, DATABASE_URL = _a.DATABASE_URL, NODE_ENV = _a.NODE_ENV;
// create a connection to the database
var client;
console.log('ENV', NODE_ENV);
if (NODE_ENV === 'test') {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}
if (NODE_ENV === 'dev') {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}
if (NODE_ENV === 'prod') {
    client = new pg_1.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}
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
exports["default"] = client;
