import { fetchExchangeRate } from '../services/exchangeRateService.js';

export const getExchangeRate = async (req, res) => {
    try {
        const { from, to } = req.query;
        const rate = await fetchExchangeRate(from, to);
        res.status(200).json({ rate });
    }catch (error){
        res.status(500).json({ message: error.message });
    }
};

export const convertCurrency = async (req, res) => {
    try {
        const { from, to, amount } = req.body;
        const rate = await fetchExchangeRate(from, to);
        const convertedAmount =(amount * rate).toFixed(2);
        res.status(200).json({ convertedAmount });
    }catch (error){
        res.status(500).json({ message: error.message });
    }
};