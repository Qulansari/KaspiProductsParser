"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scrape = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const product_1 = require("../../db/product");
const product_category_1 = require("../../db/product_category");
const https_proxy_agent_1 = require("https-proxy-agent");
class Scrape {
    static scrapeData(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingProduct = yield product_1.Product.findOne({ productId: productId });
                if (existingProduct) {
                    console.log(`Product with id ${productId} already exists in the database. Removing job from queue.`);
                    return true;
                }
                const product = yield product_category_1.ProductModel.findById(productId);
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
                const agent = new https_proxy_agent_1.HttpsProxyAgent(`http://${randomProxy.auth.username}:${randomProxy.auth.password}@${randomProxy.host}:${randomProxy.port}`);
                const axiosConfig = {
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
                    },
                    httpsAgent: agent
                };
                const response = yield axios_1.default.get(url, axiosConfig);
                const html = response.data;
                const $ = cheerio.load(html);
                let galleryImages = [];
                let videoId = '';
                $('script').each((index, element) => {
                    const scriptContent = $(element).html();
                    if (scriptContent && scriptContent.includes('BACKEND.components.item')) {
                        const match = scriptContent.match(/BACKEND\.components\.item = ({.*})/);
                        if (match) {
                            try {
                                const jsonString = match[1];
                                const jsonData = JSON.parse(jsonString);
                                galleryImages = jsonData.galleryImages.map((image) => ({
                                    location: image.location,
                                }));
                                videoId = jsonData.videoId;
                                console.log("Gallery Images:", galleryImages);
                                console.log("Video Id:", videoId);
                            }
                            catch (error) {
                                console.error("Error parsing JSON data:", error);
                            }
                        }
                        else {
                            console.error("No match found for script content:", scriptContent);
                        }
                    }
                });
                const productData = {
                    productId: productId,
                    images: galleryImages.map(image => image.location),
                    video: videoId
                };
                yield product_1.Product.findOneAndUpdate({ productId: productId }, productData, { upsert: true, new: true });
                console.log('Data successfully saved to the database!');
                return false;
            }
            catch (error) {
                console.error('Error fetching or loading the URL:', error);
                return false;
            }
        });
    }
}
exports.Scrape = Scrape;
