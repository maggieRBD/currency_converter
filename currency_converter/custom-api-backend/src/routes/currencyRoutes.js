import express from 'express';
import { getExchangeRate, convertCurrency } from '../controllers/currencyController.js';

const router = express.Router();

router.get('/exchange-rate', getExchangeRate);
router.post('/convert', convertCurrency);

export default router;