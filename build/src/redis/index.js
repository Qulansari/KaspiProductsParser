"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const redis_1 = require("redis");
const config_1 = require("../domains/config");
exports.redisClient = (0, redis_1.createClient)({
    url: config_1.Config.RedisUrl,
});
