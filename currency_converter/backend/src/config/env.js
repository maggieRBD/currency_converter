import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  exchangeApiKey: process.env.VITE_API_KEY
};