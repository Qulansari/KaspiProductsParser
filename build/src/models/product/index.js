"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const db_1 = require("../../db");
const COLLECTION_NAME = 'products';
const productSchema = new mongoose_1.Schema({
    productUrl: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    video: {
        type: String,
        required: false,
    },
});
exports.Product = db_1.MongoDataBase.DataBaseConnection.model(COLLECTION_NAME, productSchema, COLLECTION_NAME);
// export const GetVariantsRequestHistoryModel = MongoDataBase.marketplaceAnalyticsDataBaseConnection.model<IGetVariantsRequestHistory>(
//     COLLECTION_NAME,
//     GetVariantsRequestHistorySchema,
//     COLLECTION_NAME,
// )
