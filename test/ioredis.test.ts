import IORedisMock from "ioredis-mock";
import RedisClient from "../src/utils/redisClient";

jest.mock("ioredis", () => {
  const redisMock = new IORedisMock();
  const originalSet = redisMock.set.bind(redisMock);
  const originalGet = redisMock.get.bind(redisMock);

  redisMock.set = jest.fn(async (key: string, value: string) =>
    originalSet(key, value)
  );
  redisMock.get = jest.fn(async (key: string) => originalGet(key));

  return {
    __esModule: true,
    default: jest.fn(() => redisMock),
  };
});

describe("Redis Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should set a token in ioredis", async () => {
    const result = await RedisClient.setex("token123", 60, "someData");
    expect(result).toBe("OK");
  });

  it("should get data from ioredis using a token", async () => {
    await RedisClient.setex("token123", 60, "someData");
    const data = await RedisClient.get("token123");
    expect(data).toBe('"someData"');
  });
});
