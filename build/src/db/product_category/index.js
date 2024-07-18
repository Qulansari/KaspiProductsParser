"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const __1 = require("..");
const COLLECTION_NAME = 'Product';
const ProductSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Types.ObjectId,
        required: true,
    },
    sku: {
        type: String,
        required: true,
    },
    category: {
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
    },
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    productUrl: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    image: {
        small: {
            type: String,
            required: true,
        },
        medium: {
            type: String,
            required: true,
        },
        large: {
            type: String,
            required: true,
        },
    },
    characteristics: {
        type: [String],
        required: true,
    },
    createdTime: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true,
    },
    __v: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
    autoIndex: true,
});
exports.ProductModel = __1.MongoDataBase.DataBaseConnection.model(COLLECTION_NAME, ProductSchema, COLLECTION_NAME);
