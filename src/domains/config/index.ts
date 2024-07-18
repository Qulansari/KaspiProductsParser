import dotenv from 'dotenv';
dotenv.config()

interface ConfigType {
    MongoConnectUrl: string
    RedisHost: string
    RedisPort: string
    RedisUrl: string
    CollectionName: string
}

const config: ConfigType = {
    MongoConnectUrl: process.env.MONGO_CONNECT_URL || '',
    RedisHost: process.env.REDIS_HOST || '',
    RedisPort: process.env.REDIS_PORT || '',
    RedisUrl: process.env.REDIS_URL || '',
    CollectionName: process.env.REDIS_URL || '',
}

Object.entries(config).forEach(([key, value]) => {
    if (!value) {
        throw new Error(`Missing config value for ${key}`)
    }
})

export const Config = config