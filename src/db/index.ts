import { Mongoose } from 'mongoose'
import { Config } from '../domains/config'


export class MongoDataBase {
    public static DataBaseConnection: Mongoose = new Mongoose()
    static instance: any
    public static async initDataBaseConnection(): Promise<void> {
        console.log(`Trying to connect to ${Config.MongoConnectUrl}`)

        await MongoDataBase.DataBaseConnection
            .connect(Config.MongoConnectUrl)
            .then(() => {
                console.log(`Connected to ${Config.MongoConnectUrl}`)
            })
            .catch((error) => {
                console.log(`Couldn't connect to ${Config.MongoConnectUrl}`)
                throw error
            })
    }
    public static async closeDataBaseConnection(): Promise<void> {
        try {
            await MongoDataBase.DataBaseConnection.disconnect();
            console.log(`Disconnected from ${Config.MongoConnectUrl}`);
        } catch (error) {
            console.error(`Error disconnecting from ${Config.MongoConnectUrl}:`, error);
        }
    }

    public static getCollection(collectionName: string) {
        return this.DataBaseConnection.model(collectionName);
    }
    
}