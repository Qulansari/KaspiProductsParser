"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const __1 = require("..");
const COLLECTION_NAME = 'ProductMedia';
const KaspiMediaSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
    },
    // productUrl: {
    //     type: String,
    //     required: true,
    // },
    images: {
        type: [String],
        required: true,
    },
    video: {
        type: String,
    },
});
exports.Product = __1.MongoDataBase.DataBaseConnection.model(COLLECTION_NAME, KaspiMediaSchema, COLLECTION_NAME);
