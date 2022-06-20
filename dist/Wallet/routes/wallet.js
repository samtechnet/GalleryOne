"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// import dependecies and files 
var express_1 = __importDefault(require("express"));
var wallet_1 = __importDefault(require("../controllers/wallet"));
// instantiate express router
var router = express_1["default"].Router();
router.get('/userwallet/:id', wallet_1["default"].show);
router.post('/newwallet', wallet_1["default"].create);
exports["default"] = router;
