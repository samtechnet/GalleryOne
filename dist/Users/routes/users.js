"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// import dependecies and files 
var express_1 = __importDefault(require("express"));
var users_1 = __importStar(require("../controllers/users"));
// instantiate express router
var router = express_1["default"].Router();
router.get('/users', users_1.verifyAuthToken, users_1["default"].index);
router.get('/searchusers/:id', users_1.verifyAuthToken, users_1["default"].show);
router.post('/signup', users_1["default"].create);
router.post('/login', users_1["default"].authenticate);
router.patch('/updateusers/:id', users_1.verifyAuthToken, users_1["default"].update);
router["delete"]('/delete/:id', users_1.verifyAuthToken, users_1["default"].deleteUser);
exports["default"] = router;
