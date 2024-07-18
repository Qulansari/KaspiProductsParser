import { MongoDataBase } from './db';
import { Utils } from './utils';
import { initRedis } from './redis/init-redis';
import { startCronJob } from './redis/cron';



async function initialize() {
    await startCronJob();
    await initRedis();
    await MongoDataBase.initDataBaseConnection();
}

initialize()
    .then(() => {
        console.log('Database connection established.');
        
   
        Utils.addToScrapeQueue(); 
        
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });

