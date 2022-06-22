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
exports.show = exports.create = exports.index = void 0;
var product_1 = require("../models/product");
var errors_1 = __importDefault(require("../services/errorHandlers/errors"));
var catchAsync_1 = require("../services/errorHandlers/catchAsync");
var cloudinary_1 = require("../services/cloudinary/cloudinary");
// create an instance of the class imported
var products = new product_1.AllProducts();
// method to show all Products in the db
var index = (0, catchAsync_1.use)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allProduct;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, products.index()];
            case 1:
                allProduct = _a.sent();
                if (!allProduct) {
                    throw new errors_1["default"]('Product records not found', 400);
                }
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        message: allProduct
                    })];
        }
    });
}); });
exports.index = index;
var show = (0, catchAsync_1.use)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, aProduct;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, products.show(id)];
            case 1:
                aProduct = _a.sent();
                if (!aProduct) {
                    throw new errors_1["default"]('Product record not found', 400);
                }
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        message: aProduct
                    })];
        }
    });
}); });
exports.show = show;
var create = (0, catchAsync_1.use)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var linkPath, product_link, product, allProduct;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                linkPath = String((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
                return [4 /*yield*/, (0, cloudinary_1.cloud)(linkPath, "Gallaryonefolder")];
            case 1:
                product_link = _b.sent();
                product = {
                    name: req.body.name,
                    price: req.body.price,
                    category: req.body.category,
                    description: req.body.description,
                    avater: product_link
                };
                return [4 /*yield*/, products.create(product)];
            case 2:
                allProduct = _b.sent();
                if (!allProduct) {
                    throw new errors_1["default"]('Product record not found', 400);
                }
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        message: allProduct
                    })];
        }
    });
}); });
exports.create = create;
var update = (0, catchAsync_1.use)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, aProduct;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, products.show(id)];
            case 1:
                aProduct = _a.sent();
                if (!aProduct) {
                    throw new errors_1["default"]('Product record not found', 400);
                }
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        message: aProduct
                    })];
        }
    });
}); });
