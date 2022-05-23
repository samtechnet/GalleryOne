"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// import dependencies and files
var express_1 = __importDefault(require("express"));
var products_1 = __importDefault(require("../Products/routes/products"));
var router = express_1["default"].Router();
router.use('/products', products_1["default"]);
exports["default"] = router;
