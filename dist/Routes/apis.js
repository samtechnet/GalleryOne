"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// import dependencies and files
var express_1 = __importDefault(require("express"));
var products_1 = __importDefault(require("../Products/routes/products"));
var users_1 = __importDefault(require("../Users/routes/users"));
var accounts_1 = __importDefault(require("../Transactions/Routes/accounts"));
var router = express_1["default"].Router();
router.get('/', function (req, res) {
    res.send('Api is live');
});
router.use('/products', products_1["default"]);
router.use('/users', users_1["default"]);
router.use('/accounts', accounts_1["default"]);
exports["default"] = router;
