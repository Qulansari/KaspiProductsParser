import Queue from 'bull';
import { Config } from '../config';
import { ObjectId } from 'mongoose';


export interface JobType {
    productId: ObjectId,
}

export const scrapeQueue = new Queue<JobType>('scrape-Queue', Config.RedisUrl)


