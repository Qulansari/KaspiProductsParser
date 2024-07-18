import { ObjectId, Schema, Types, type Document } from 'mongoose'
import { MongoDataBase } from '..'

const COLLECTION_NAME = 'Product'

export interface Iproduct extends Document {
    _id: ObjectId,
    sku: string,
    category: {
        name: string,
        code: string
    }
    name: string,
    brand: string,
    productUrl: string,
    weight: number,
    image: {
        small: string,
        medium: string,
        large: string
    }
    characteristics: [String],
    createdTime: Date,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    __v: number
}


const ProductSchema = new Schema<Iproduct>(
    {
        _id: {
            type: Types.ObjectId,
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
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
        autoIndex: true,
    }
);

export const ProductModel = MongoDataBase.DataBaseConnection.model<Iproduct>(
    COLLECTION_NAME,
    ProductSchema,
    COLLECTION_NAME
);


