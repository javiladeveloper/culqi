import Redis from "ioredis";
import { Logger } from "../libs/Logger";
import config from "../config/vars";
class RedisClient {
  client: any;
  log: Logger;

  constructor() {
    this.client = new Redis({
      host: config.host,
      port: Number(config.portRedis),
    });
    this.log = new Logger("utils");
  }

  public async setex(
    key: string,
    seconds: number,
    value: string
  ): Promise<void> {
    this.log.debug("[creditCard]", "Set Redis");
    return await this.client.set(key, JSON.stringify(value), "EX", seconds);
  }

  public async get(key: string): Promise<string | null> {
    this.log.debug("[creditCard]", "Get Redis");

    return await this.client.get(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
