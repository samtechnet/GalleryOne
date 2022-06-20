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
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var body_parser_1 = __importDefault(require("body-parser"));
var user_1 = require("./routes/user");
var product_1 = require("./routes/product");
// import now from "./utilities/func";
var errors_1 = __importDefault(require("./services/errorHandlers/errors"));
var errorController_1 = __importDefault(require("./middleware/errorController"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var documentation_1 = __importDefault(require("./controller/documentation"));
dotenv_1["default"].config();
var PORT = process.env.PORT || 5000;
var app = (0, express_1["default"])();
app.use(body_parser_1["default"].json());
app.use(express_1["default"].json());
app.use("/documentations", swagger_ui_express_1["default"].serve);
app.use("/documentations", swagger_ui_express_1["default"].setup(documentation_1["default"]));
(0, user_1.user_routes)(app);
(0, user_1.cognito_routes)(app);
(0, product_1.cloudinary_routes)(app);
app.get("/galleryone", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.send("This is server");
            return [2 /*return*/];
        });
    });
});
app.all('*', function (req, res, next) {
    throw new errors_1["default"]("Requested URL ".concat(req.path, " not found!"), 404);
});
app.use(errorController_1["default"]);
app.listen(PORT, function () {
    console.log("Server started successfulyy on PORT ".concat(PORT));
});
exports["default"] = app;
// const runApp = async (): Promise<any>=> {
//     try {
//         const result = await dbConnection('SELECT SESSION_USER');
//         if (result.rows) {
//             const res = console.log(result.rows)
//         }
//         app.listen(PORT, () => {
//             console.log(`Server started successfulyy on PORT ${PORT}`);
//         });
//     } catch (error) {
//         console.log(error)
//     }
// };
// runApp();
