import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT || 3001,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
};
