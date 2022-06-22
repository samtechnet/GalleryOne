"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordSender = exports.welcomeSender = void 0;
const config_1 = __importDefault(require("./config"));
const welcomeSender = (recipient, name, code) => {
    console.log("Called in Sender");
    config_1.default
        .send({
        template: "welcome",
        message: {
            to: recipient,
        },
        locals: {
            name: name,
            code: code
        }
    })
        .then(console.log)
        .catch(console.error);
};
exports.welcomeSender = welcomeSender;
const forgotPasswordSender = (recipient, name, code) => {
    config_1.default
        .send({
        template: "forgot",
        message: {
            to: recipient,
        },
        locals: {
            name: name,
            code: code
        }
    })
        .then(console.log)
        .catch(console.error);
};
exports.forgotPasswordSender = forgotPasswordSender;
