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
exports.cloud = exports.store = exports.upload = void 0;
var cloudinary_1 = require("cloudinary");
var catchAsync_1 = require("../../services/errorHandlers/catchAsync");
var multer_1 = __importDefault(require("multer"));
var appdir = process.cwd();
cloudinary_1.v2.config({
    cloud_name: 'dsl47cce0',
    api_key: '356752717168943',
    api_secret: 'hTZNQdVuOn4HxTv6WZTqlrNGqAg',
    secure: true
});
var cloud = function (path, myFiles) { return __awaiter(void 0, void 0, void 0, function () {
    var uploader;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, cloudinary_1.v2.uploader.upload(path, { upload_preset: myFiles })];
            case 1:
                uploader = _a.sent();
                // console.log(upload)
                return [2 /*return*/, uploader.secure_url];
        }
    });
}); };
exports.cloud = cloud;
//const storedImages = path.join(appdir, "/src/services/cloudinary/images")
var fileStorageEngine = multer_1["default"].diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images/");
    },
    filename: function (req, file, cb) {
        // console.log(file + " from multer storage engine");
        cb(null, Date.now() + '--' + file.originalname);
    }
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else if (file.mimetype === 'application/pdf') {
        cb(null, true);
    }
    else {
        cb({ message: "Unspported file format ".concat(file.mimetype) });
    }
};
var upload = (0, multer_1["default"])({ storage: fileStorageEngine, limits: { fileSize: 4200 * 3800 }, fileFilter: fileFilter });
exports.upload = upload;
var store = (0, catchAsync_1.image)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        result = req.file;
        res.status(200).json({
            message: "Single file upload success",
            data: result === null || result === void 0 ? void 0 : result.path
        });
        return [2 /*return*/];
    });
}); });
exports.store = store;
