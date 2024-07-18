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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const queues_1 = require("../domains/queues");
const db_1 = require("../db");
const product_category_1 = require("../db/product_category");
const node_cron_1 = __importDefault(require("node-cron"));
class Utils {
    static addToScrapeQueue() {
        return __awaiter(this, arguments, void 0, function* (limit = 1000) {
            try {
                yield db_1.MongoDataBase.initDataBaseConnection();
                const cursor = product_category_1.ProductModel.find({ productUrl: { $exists: true } }, { _id: 1, productUrl: 1 }).limit(limit).cursor();
                let count = 0;
                for (let product = yield cursor.next(); product != null; product = yield cursor.next()) {
                    yield queues_1.scrapeQueue.add({
                        productId: product._id,
                    }, {
                        removeOnComplete: true,
                        removeOnFail: true,
                        attempts: 5,
                        jobId: `${product._id}`,
                    });
                    count++;
                }
                console.log(`Added ${count} products to scrape queue.`);
            }
            catch (error) {
                console.error('Error adding products to scrape queue:', error);
            }
            finally {
                yield db_1.MongoDataBase.closeDataBaseConnection();
            }
        });
    }
}
exports.Utils = Utils;
node_cron_1.default.schedule('* * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobCounts = yield queues_1.scrapeQueue.getJobCounts();
        const totalJobs = jobCounts.waiting + jobCounts.active + jobCounts.delayed + jobCounts.failed;
        if (totalJobs < 10000) {
            yield Utils.addToScrapeQueue(3000);
        }
        else {
            console.log(`Queue has ${totalJobs} jobs. Waiting for the next check.`);
        }
    }
    catch (error) {
        console.error('Error checking or adding jobs to the queue:', error);
    }
}));
