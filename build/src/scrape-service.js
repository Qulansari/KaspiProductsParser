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
const queues_1 = require("./domains/queues");
const scrape_1 = require("./domains/scrape");
const db_1 = require("./db");
db_1.MongoDataBase.initDataBaseConnection();
console.log("Workwrs started");
queues_1.scrapeQueue.process(10, (job, done) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = job.data;
    console.log("Data recieved");
    yield scrape_1.Scrape.scrapeData(productId);
    done();
}));
