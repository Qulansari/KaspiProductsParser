import * as cron from 'node-cron';
import { Utils } from '../../utils';
import { scrapeQueue } from '../../domains/queues';


export function startCronJob() {
    cron.schedule('0 * * * *', async () => {
        console.log('Running addToScrapeQueue job');
    
        
        const { waiting } = await scrapeQueue.getJobCounts();
    
        const maxQueueSize = 10000; 
    
       
        if (waiting < maxQueueSize) {
            await Utils.addToScrapeQueue(); 
        } else {
            console.log(`Queue limit (${maxQueueSize}) reached. Skipping addToScrapeQueue job.`);
        }
    });
}
