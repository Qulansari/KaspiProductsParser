import { scrapeQueue } from "./domains/queues";
import { Scrape } from "./domains/scrape";
import { MongoDataBase } from "./db";


    MongoDataBase.initDataBaseConnection();

    console.log("Workwrs started")
    scrapeQueue.process(10, async (job, done) => {
        const {productId} = job.data
        console.log("Data recieved");
        await Scrape.scrapeData(productId);
        done()
    });




