import axios from 'axios';

export const fetchExchangeRate = async (from, to) => {
    const apiKey = process.env.VITE_API_KEY;
    const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;
    const response = await axios.get(url);
    const rates = response.data.rates;

    if(!rates[from] || !rates[to]){
        throw new Error('Invalid currency.');
    }
    
    return rates[to] / rates[from];
}