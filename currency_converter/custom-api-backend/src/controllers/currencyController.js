import { fetchExchangeRate } from '../services/exchangeRateService.js';
// This file exports functions that handle the business logic for each route. 
// Each function corresponds to a specific endpoint and processes incoming requests.

export const getExchangeRate = async (req, res) => {
    try {
        const { from, to } = req.query;
        const rate = await fetchExchangeRate(from, to);
        res.status(200).json({ rate });
    }catch (err){
        res.status(500).json({ message: err.message });
    }
};

export const convertCurrency = async (req, res) => {
    try {
        const { from, to, amount } = req.body;
        const rate = await fetchExchangeRate(from, to);
        const convertedAmount =(amount * rate).toFixed(2);
        res.status(200).json({ convertedAmount });
    }catch (err){
        res.status(500).json({ message: err.message });
    }
};