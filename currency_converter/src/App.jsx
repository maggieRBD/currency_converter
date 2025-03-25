import { use, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [amount, setAmount] = useState("")
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);

  const fetchExchangeRate = async () => {
    try{
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(
        `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`
      );
      const data = await response.json();

      if(!data.rates || !data.rates[toCurrency] || !data.rates[fromCurrency]){
        throw new Error("Nepodarilo se ziskat kurz.")
      }

      const rate = data.rates[toCurrency] / data.rates[fromCurrency]
      return rate;
    }catch (err){
      setError(err.message);
      return null;
    }
  };

  const handleConvert =  async (e) => {
    e.preventDefault();
    setError(null);

    const rate =  await fetchExchangeRate();
    if (rate){
      setConvertedAmount((amount * rate).toFixed(2));
    }
  };

  return (
    <div className="app-container">
      <h1 className='title'>Purple currency converter</h1>
      <div className='converter-box'>
        <form onSubmit={handleConvert} className='converter-form'>
          <div className='form-group'>
            <label>Amount to convert</label>
            <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='Enter amount'
            required/>
          </div>

          <div className='form-group'>
            <label>From</label>
            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="CZK">CZK</option>
            </select>
          </div>

          <div className='form-group'>
            <label>To</label>
            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="CZK">CZK</option>
            </select>
          </div>
        </form>
      </div>

      <button type='submit' className='converter-button'>Convert currency</button>

      {convertedAmount !== null && (
        <div className='result-box'>
          <h2>Result</h2>
          <p className='result'>{convertedAmount} {toCurrency}</p>
          <p className='calculations'>Numbver of calculations made: {calculations}</p>
        </div>
      )}
    </div>
  );
}

export default App
