"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.cloudinary_routes = void 0;
var cloudinary_1 = require("../services/cloudinary/cloudinary");
var prouduct_1 = require("../controller/prouduct");
var verifyAuthToken_1 = __importDefault(require("../controller/Auth/verifyAuthToken"));
var cloudinary_routes = function (app) {
    app.post("/single", verifyAuthToken_1["default"], cloudinary_1.upload.single('image'), cloudinary_1.store),
        app.post("/index", verifyAuthToken_1["default"], prouduct_1.index);
    app.get("/product/index", verifyAuthToken_1["default"], prouduct_1.index);
    app.get("/product/show/:id", verifyAuthToken_1["default"], prouduct_1.show);
    app.post("/product/create", verifyAuthToken_1["default"], cloudinary_1.upload.single("image"), prouduct_1.create);
};
exports.cloudinary_routes = cloudinary_routes;
