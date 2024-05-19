import dotenv from "dotenv";
dotenv.config();

export const config = {
  // DB Configuration
  PORT: process.env.PORT || 3000,
  DB: {
    NAME: process.env.DB_NAME,
    URL: process.env.MONGODB_URL,
  },

  // JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET,
  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,

  // Nodemailer Configuration
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,

  // Redis Configuration
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_DB: process.env.REDIS_DB,
};
