import { Card } from "../src/models/Card";
import { CardService } from "../src/services/card.service";

jest.mock("ioredis", () => {
  const redisMock = {
    get: jest.fn().mockImplementation((key: string) => {
      if (key === "mockedToken") {
        return JSON.stringify({
          cardNumber: 1234567890123,
          cvv: 123,
          expirationMonth: "12",
          expirationYear: "2024",
          email: "example@gmail.com",
        });
      } else {
        return null; // Return null if token is not found
      }
    }),
  };

  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => redisMock),
  };
});
describe("CardService", () => {
  let cardService: CardService;

  beforeEach(() => {
    cardService = new CardService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should get card ", async () => {
    const token = "mockedToken";
    const cardData = await cardService.getCardData(token);

    expect(typeof cardData).toBe("object");
  });
  it("should get card data from Redis", async () => {
    const token = "mockedToken";
    const expectedCardData: Card = {
      cardNumber: 1234567890123,
      cvv: 123,
      expirationMonth: "12",
      expirationYear: "2024",
      email: "example@gmail.com",
    };

    const cardData = await cardService.getCardData(token);

    expect(cardData).toEqual(expectedCardData);
  });
  it("should return null if token is not found in Redis", async () => {
    const token = "nonExistentToken";

    const cardData = await cardService.getCardData(token);
    expect(cardData).toBeNull();
  });
});
