import { scrapeQueue } from "../domains/queues"; 
import { MongoDataBase } from '../db';
import { ProductModel } from '../db/product_category';
import cron from 'node-cron';

export class Utils {
    public static async addToScrapeQueue(limit: number = 2000, skip: number = 0): Promise<void> {
        try {
            await MongoDataBase.initDataBaseConnection();
    
            const cursor = ProductModel.find(
                { productUrl: { $exists: true } },
                { _id: 1, productUrl: 1 }
            ).skip(skip).limit(1).cursor();

            let count = 0;
            for (let i = 0; i<limit; i++) {
                const product = await cursor.next();
                await scrapeQueue.add(
                    {
                        productId: product._id,
                    },
                    {
                        removeOnComplete: true,
                        removeOnFail: true,
                        attempts: 5,
                        jobId: `${product._id}`,
                    }
                );
                count++;
            }
    
            console.log(`Added ${count} products to scrape queue.`);
        } catch (error) {
            console.error('Error adding products to scrape queue:', error);
        } finally {
            await MongoDataBase.closeDataBaseConnection();
        }
    }
}

let skip = 0
cron.schedule('* * * * *', async () => {
    try {
        const jobCounts = await scrapeQueue.getJobCounts();
        const totalJobs = jobCounts.waiting + jobCounts.active + jobCounts.delayed + jobCounts.failed;

        if (totalJobs < 10000) {
            skip += 2000
            await Utils.addToScrapeQueue(2000);
        } else {
            console.log(`Queue has ${totalJobs} jobs. Waiting for the next check.`);
        }
    } catch (error) {
        console.error('Error checking or adding jobs to the queue:', error);
    }
});








