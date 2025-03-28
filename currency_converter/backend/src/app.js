import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import currencyRouter from './routes/currencyRoutes.js';
import conversionRouter from './routes/conversionRoutes.js';
import connectDB from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json());
app.use('/api/currency', currencyRouter);
app.use('/api/conversions', conversionRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});