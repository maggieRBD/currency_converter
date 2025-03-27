import { Conversion } from '../models/conversionModel.js';

export const saveConversion = async (req, res) => {
    try {
        console.log(req.body);
        const { fromCurrency, toCurrency, amount, convertedAmount } = req.body;

        const newConversion = new Conversion({
            fromCurrency,
            toCurrency,
            amount,
            convertedAmount
        });

        await newConversion.save();
        res.status(201).json({ message: 'Conversion saved successfully.' });
    }catch (error) {
        res.status(500).json({ error: 'Failed to save conversion.' });
    }
};

export const getConversions = async (req, res) => {
    try {
        const conversions = await Conversion.find().sort({ date: -1 });
        res.status(200).json(conversions);
    }catch (error) {
        res.status(500).json({ error: 'Failed to fetch conversions.' });
    }
};