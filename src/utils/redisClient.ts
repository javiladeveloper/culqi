import Redis from "ioredis";

class RedisClient {
  client: any;
  constructor() {
    this.client = new Redis();
  }

  public async setex(
    key: string,
    seconds: number,
    value: string
  ): Promise<void> {
    await this.client.set(key, JSON.stringify(value), "EX", seconds); // Cache for 60 sec
  }

  public async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  public quit(): void {
    this.client.quit();
  }
}

const redisClient = new RedisClient();

export default redisClient;
