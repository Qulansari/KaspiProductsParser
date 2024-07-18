import axios from "axios";
import * as cheerio from "cheerio";
import { Product } from "../../db/product";
import { ObjectId, Schema } from "mongoose";
import { ProductModel } from "../../db/product_category";
import { HttpsProxyAgent } from "https-proxy-agent";

export class Scrape {
    public static async scrapeData(productId: Schema.Types.ObjectId) {
        try {
            const existingProduct = await Product.findOne({ productId: productId });
            if (existingProduct) {
                console.log(`Product with id ${productId} already exists in the database. Removing job from queue.`);
                return true; 
            }

            const product = await ProductModel.findById(productId);
            if (!product) {
                throw new Error(`Product with id ${productId} not found.`);
            }
            const url = product.productUrl;
            const proxyList = [
                { protocol: 'http', host: '46.101.124.11', port: '8050', auth: { username: 'test', password: 'test' } },
                { protocol: 'http', host: '167.172.162.223', port: '8038', auth: { username: 'test', password: 'test' } },
                { protocol: 'http', host: '46.101.124.11', port: '8078', auth: { username: 'test', password: 'test' } }
            ];

            const randomProxy = proxyList[Math.floor(Math.random() * proxyList.length)];
       
            const agent = new HttpsProxyAgent(
                `http://${randomProxy.auth.username}:${randomProxy.auth.password}@${randomProxy.host}:${randomProxy.port}`
            );

            const axiosConfig = {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
                },
                httpsAgent: agent 
            };

            const response = await axios.get(url, axiosConfig);

            const html = response.data;
            const $ = cheerio.load(html);
            let galleryImages: any[] = [];
            let videoId = '';

            $('script').each((index, element) => {
                const scriptContent = $(element).html();
                if (scriptContent && scriptContent.includes('BACKEND.components.item')) {
                    const match = scriptContent.match(/BACKEND\.components\.item = ({.*})/);
                    if (match) {
                        try {
                            const jsonString = match[1];
                            const jsonData = JSON.parse(jsonString);

                            galleryImages = jsonData.galleryImages.map((image: { location: any; }) => ({
                                location: image.location,
                            }));

                            videoId = jsonData.videoId;

                            console.log("Gallery Images:", galleryImages);
                            console.log("Video Id:", videoId);
                        } catch (error) {
                            console.error("Error parsing JSON data:", error);
                        }
                    } else {
                        console.error("No match found for script content:", scriptContent);
                    }
                }
            });
            const productData = {
                productId: productId,
                images: galleryImages.map(image => image.location),
                video: videoId
            };

            await Product.findOneAndUpdate(
                { productId: productId },
                productData,
                { upsert: true, new: true }
            );

            console.log('Data successfully saved to the database!');
            return false; 

        } catch (error) {
            console.error('Error fetching or loading the URL:', error);
            return false; 
        }
    }
}








