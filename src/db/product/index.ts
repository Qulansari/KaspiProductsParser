import { Schema, Document, ObjectId, Types } from 'mongoose'
import { MongoDataBase } from "..";


const COLLECTION_NAME = 'ProductMedia'

export interface Product extends Document {
    productId: ObjectId,
    // productUrl: string,
    images: [string],
    video: string
}


const KaspiMediaSchema = new Schema<Product>
({
    productId: {
        type: Types.ObjectId,
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
}
)

export const Product = MongoDataBase.DataBaseConnection.model<Product> (
    COLLECTION_NAME,
    KaspiMediaSchema,
    COLLECTION_NAME,
)
