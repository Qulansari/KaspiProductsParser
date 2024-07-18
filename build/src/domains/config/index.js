"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    MongoConnectUrl: process.env.MONGO_CONNECT_URL || '',
    RedisHost: process.env.REDIS_HOST || '',
    RedisPort: process.env.REDIS_PORT || '',
    RedisUrl: process.env.REDIS_URL || '',
    CollectionName: process.env.REDIS_URL || '',
};
Object.entries(config).forEach(([key, value]) => {
    if (!value) {
        throw new Error(`Missing config value for ${key}`);
    }
});
exports.Config = config;
