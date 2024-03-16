import dotenv from "dotenv";
dotenv.config();

interface Config {
  port: string | undefined;
  jwtSecret: string | undefined;
  autorization: string | undefined;
  secExpiration: string | undefined;
}

const config: Config = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  autorization: process.env.AUTORIZATION,
  secExpiration: process.env.SECOND_EXPIRATION,
};

export default config;
