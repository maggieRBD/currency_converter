import { useEffect, useState } from 'react'
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
  const [savedConversions, setSavedConversions] = useState([]);
  const [currencyUsage, setCurrencyUsage] = useState({});

  useEffect(() => {
    const fetchSavedConversions = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/conversions/history`);
        const data = await response.json();
        setSavedConversions(data);
      }catch (error){
        console.error('Failed to fetch saved conversions.');
      }
    };

    fetchSavedConversions();
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try{
        const response = await fetch(
          `https://localhost:3000/api/currency?from=${fromCurrency}&to=${toCurrency}`
        );
        const data = await response.json();

        if(!data.rate){
          throw new Error("Could not fetch exchange rate.");
        }

        return data.rate;
      }catch (err){
        setError(err.message);
        return null;
      }
    };
  
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const getMostUsedCurrency = () => {
    if (Object.keys(currencyUsage).length === 0){
      return null;
    }
    return Object.entries(currencyUsage).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
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
        setConvertedAmount(data.convertedAmount);
        setCalculations(calculations + 1);

        setCurrencyUsage((prevUsage) => ({
          ...prevUsage,
          [toCurrency]: (prevUsage[toCurrency] || 0) + 1
        }));

        await fetch(`http://localhost:3000/api/conversions/save`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fromCurrency,
            toCurrency,
            amount: parseFloat(amount),
            convertedAmount: data.convertedAmount
          }),
        });

        const savedResponse = await fetch(`http://localhost:3000/api/conversions/history`);
        const savedData = await savedResponse.json();
        setSavedConversions(savedData);
      }else{
        throw new Error("Could not convert the currency.");
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
          <h3>Result</h3>
          <p className='result'>{convertedAmount} <span className='currency'>{toCurrency}</span></p>
          <div className='divider'></div>
          <p className='calculations'>Number of calculations made:</p>
          <p className='count'>{calculations}</p>
        </div>
      )}

      <div className='saved-and-mostly-used'>
        <div className='mostly-used-currency'>
          <h2>Mostly used end currency</h2>
          {getMostUsedCurrency() ? (
            <p>{getMostUsedCurrency()}</p>
          ) : (
            <p>No conversions made yet.</p>
          )}
        </div>

        <div className='saved-conversions'>
          <h2>Saved Conversions</h2>
          <ul>
            {savedConversions.slice(0,3).map((conversion) => (
              <li key={conversion._id}>
                <p>{conversion.amount} <span className='currency'>{conversion.fromCurrency}</span> to {conversion.convertedAmount} <span className='currency'>{conversion.toCurrency}</span></p>
                <p className='date'>{new Date(conversion.date).toLocaleString()}</p>
              </li>
            ))} 
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App
