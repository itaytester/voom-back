import redis from "redis";
import { promisify } from "util";
import log from "../utils/logger";

const client = redis.createClient();

client.on('connect', () => {
    log.info("client connected to Redis container")
});

client.on("error", (error) => {
    log.error(error);
});

export const get = promisify(client.get).bind(client);
export const set = promisify(client.set).bind(client);
export const expire = promisify(client.expire).bind(client);
export const getList = promisify(client.lrange).bind(client);

export default client;



