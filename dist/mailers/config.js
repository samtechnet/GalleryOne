"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const email_templates_1 = __importDefault(require("email-templates"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let transporter = nodemailer_1.default.createTransport({
    host: process.env.GMAIL_HOST,
    port: process.env.GMAIL_PORT,
    secure: process.env.GMAIL_USESSL,
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
    },
});
const email = new email_templates_1.default({
    views: { root: "email-templates",
        options: { extension: "ejs" },
    },
    message: {
        from: process.env.FROM
    },
    send: true,
    transport: transporter
});
exports.default = email;
