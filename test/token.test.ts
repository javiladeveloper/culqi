import { TokenService } from "../src/services/token.service";
import jwt from "../src/utils/jwtUtils";
jest.mock("../src/utils/jwtUtils", () => ({
  signToken: jest.fn().mockReturnValue("mockedToken"),
}));
jest.mock("ioredis", () => {
  const redisMock = {
    set: jest.fn().mockResolvedValue("OK"),
    get: jest.fn().mockResolvedValue(null),
  };

  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => redisMock),
  };
});
describe("Token Service", () => {
  let tokenService: TokenService;

  beforeEach(() => {
    tokenService = new TokenService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should create a token", async () => {
    const token = await tokenService.createToken(
      35600000000048,
      123,
      "2026",
      "12",
      "jonathan.joan.avila@gmail.com"
    );
    expect(typeof token).toBe("string");
  });

  it("should create a token and save it in Redis", async () => {
    const cardNumber = 1234567890123;
    const cvv = 123;
    const expirationMonth = "12";
    const expirationYear = "2024";
    const email = "example@gmail.com";

    const token = await tokenService.createToken(
      cardNumber,
      cvv,
      expirationMonth,
      expirationYear,
      email
    );

    expect(jwt.signToken).toHaveBeenCalledWith({
      cardNumber,
      cvv,
      expirationMonth,
      expirationYear,
      email,
    });

    expect(token).toEqual("mockedToken");
  });
  it("should handle errors during token creation", async () => {
    (jwt.signToken as jest.Mock).mockImplementation(() => {
      throw new Error("Token creation failed");
    });

    await expect(async () => {
      await tokenService.createToken(
        1234567890123,
        123,
        "12",
        "2024",
        "example@gmail.com"
      );
    }).rejects.toThrowError("Token creation failed");
  });
});
