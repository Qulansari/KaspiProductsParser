"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeQueue = void 0;
const bull_1 = __importDefault(require("bull"));
const config_1 = require("../config");
exports.scrapeQueue = new bull_1.default('scrape-Queue', config_1.Config.RedisUrl);
