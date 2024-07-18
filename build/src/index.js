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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const utils_1 = require("./utils");
const init_redis_1 = require("./redis/init-redis");
const cron_1 = require("./redis/cron");
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, cron_1.startCronJob)();
        yield (0, init_redis_1.initRedis)();
        yield db_1.MongoDataBase.initDataBaseConnection();
    });
}
initialize()
    .then(() => {
    console.log('Database connection established.');
    utils_1.Utils.addToScrapeQueue();
})
    .catch((error) => {
    console.error('Error connecting to database:', error);
});
