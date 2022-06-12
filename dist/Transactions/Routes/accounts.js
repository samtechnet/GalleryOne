"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// import dependecies and files 
var express_1 = __importDefault(require("express"));
var accounts_1 = __importDefault(require("../Controllers/accounts"));
// instantiate express router
var router = express_1["default"].Router();
router.get('/allaccounts', accounts_1["default"].index);
router.get('/search/:user_id', accounts_1["default"].show);
router.get('/balance/:user_id', accounts_1["default"].showBalance);
router.post('/newaccount', accounts_1["default"].create);
router.patch('/creditaccount', accounts_1["default"].creditAccount);
router.patch('/debitaccount', accounts_1["default"].debitAccount);
router["delete"]('/:user_id', accounts_1["default"].deleteAccount);
exports["default"] = router;
