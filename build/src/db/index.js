"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDataBase = void 0;
const mongoose_1 = require("mongoose");
const config_1 = require("../domains/config");
class MongoDataBase {
    static initDataBaseConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Trying to connect to ${config_1.Config.MongoConnectUrl}`);
            yield MongoDataBase.DataBaseConnection
                .connect(config_1.Config.MongoConnectUrl)
                .then(() => {
                console.log(`Connected to ${config_1.Config.MongoConnectUrl}`);
            })
                .catch((error) => {
                console.log(`Couldn't connect to ${config_1.Config.MongoConnectUrl}`);
                throw error;
            });
        });
    }
    static closeDataBaseConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MongoDataBase.DataBaseConnection.disconnect();
                console.log(`Disconnected from ${config_1.Config.MongoConnectUrl}`);
            }
            catch (error) {
                console.error(`Error disconnecting from ${config_1.Config.MongoConnectUrl}:`, error);
            }
        });
    }
    static getCollection(collectionName) {
        return this.DataBaseConnection.model(collectionName);
    }
}
exports.MongoDataBase = MongoDataBase;
MongoDataBase.DataBaseConnection = new mongoose_1.Mongoose();
