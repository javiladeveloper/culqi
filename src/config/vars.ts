import dotenv from "dotenv";
dotenv.config();

interface Config {
  port: string | undefined;
  jwtSecret: string | undefined;
  autorization: string | undefined;
  secExpiration: string | undefined;
  host: string | undefined;
  portRedis: string | undefined;
}

const config: Config = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  autorization: process.env.AUTORIZATION,
  secExpiration: process.env.SECOND_EXPIRATION,
  host: process.env.HOST,
  portRedis: process.env.PORTREDIS,
};

export default config;
