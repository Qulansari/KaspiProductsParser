import { redisClient } from './index'

export const initRedis = async (): Promise<void> => {
    console.log(`Trying to connect to redis client...`)
    await redisClient
        .connect()
        .then(() => console.log(`Connected to redis client...`))
        .catch((err: any) => { console.log(`Couldn't connect to redis client...`); console.log(err) })
}