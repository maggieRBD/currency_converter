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
  const [calculations, setCalculations] = useState(0);

  const fetchExchangeRate = async () => {
    try{
      const response = await fetch(
        `https://localhost:3000/api/currency?from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await response.json();

      if(!data.rate){
        throw new Error("Nepodarilo se ziskat kurz.")
      }

      return data.rate;
    }catch (err){
      setError(err.message);
      return null;
    }
  };

  const handleConvert =  async () => {
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/api/currency/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ from: fromCurrency, to: toCurrency, amount: parseFloat(amount) }),
      });

      const data = await response.json();

      if (data.convertedAmount){
        console.log(data.convertedAmount);
        setConvertedAmount(data.convertedAmount);
        setCalculations(calculations + 1);
      }else{
        throw new Error("Nepodarilo se převést měnu.")
      }
    }catch (err){
      setError(err.message);
    }
  };

  return (
    <div className="app-container">
      <h1 className='title'>Purple currency converter</h1>
      <div className='converter-box'>
        <div className='converter-form'>
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
        </div>
      </div>

      <button onClick={handleConvert} type='button' className='converter-button'>Convert currency</button>

      {convertedAmount !== null && (
        <div className='result-box'>
          <h2>Result</h2>
          <p className='result'>{convertedAmount} {toCurrency}</p>
          <p className='calculations'>Number of calculations made: {calculations}</p>
        </div>
      )}
    </div>
  );
}

export default App
