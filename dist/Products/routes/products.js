"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// import dependecies and files 
var express_1 = __importDefault(require("express"));
var products_1 = __importDefault(require("../controllers/products"));
// instantiate express router
var router = express_1["default"].Router();
router.get('/allproducts', products_1["default"].index);
router.get('/:productId', products_1["default"].show);
router.post('/newproduct', products_1["default"].create);
router.patch('/:productId', products_1["default"].update);
router["delete"]('/:productId', products_1["default"].deleteProduct);
exports["default"] = router;
