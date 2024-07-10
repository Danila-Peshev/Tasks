import React from 'react';

function MainForm() { 
  const [data, setData] = React.useState({});
  const [fromCurrency, setFromCurrency] = React.useState("RUB");
  const [toCurrency, setToCurrency] = React.useState("EUR");
  const [fromPrice, setFromPrice] = React.useState("null");
  const [toPrice, setToPrice] = React.useState("null");

  React.useEffect(() => {
    fetch('https://api.currencyapi.com/v3/latest?apikey=cur_live_v3m1toL9UOcUiy0OylVILzh2A0IsUOFIEtEuAthJ&currencies=')
  .then((response) => response.json())
  .then((json) => {
    setData(json.data);
    console.log(json.data);
  })
  .catch((error) => {
    console.warn(error);
    alert("API Access error");
  })
  }, [])

  const onChangeFromPrice = (value) => {
    value = parseFloat(value) < 0.00 ? 0.00 : value;
    const leftPrice = (value / data[fromCurrency].value);
    const rightPrice = (leftPrice * data[toCurrency].value); 
    setFromPrice(value);
    setToPrice(rightPrice.toFixed(6));
  }

  const onChangeToPrice = (value) => {
    value = parseFloat(value) < 0.00 ? 0.00 : value;
    const leftPrice = ((data[fromCurrency].value / data[toCurrency].value) * value);
    setFromPrice(leftPrice.toFixed(6));
    setToPrice(value);
  }

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]); 

  React.useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]); 

  function swapCurrencies() {
    const prevCurrency = toCurrency;
    setFromCurrency(prevCurrency);
    setToCurrency(fromCurrency);
  }

  return (
    <div className="main-form">
        <h1 className="title">Конвертер валют</h1>

        <div className="row-currency">
          <p className="you-are-transferring-from-text">Вы переводите из</p>
          <select className="select-to-currency" value={toCurrency} onChange={e => {setToCurrency(e.target.value)}}>
            {
              Object.values(data).map((currency) =>
                <option value={currency.code}>{currency.code}</option>
              )
            }
          </select>
          <p className="in-text">в</p>
          <select className="select-from-currency" value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}> 
            {
              Object.values(data).map((currency) =>
                <option value={currency.code}>{currency.code}</option>
              )
            }
          </select>
        </div>
        
        <div className="row-values">
        <input type="number" className="to-price" step={1} min={1} 
          value={toPrice} onChange={value => onChangeToPrice(value.target.value)}></input>    
          <p className="equal-text">=</p>
          <input type="number" className="from-price" step={1} min={1} 
          value={fromPrice} onChange={value => onChangeFromPrice(value.target.value)}></input>    
        </div>

        <div className="swap-text">
          <a onClick={swapCurrencies}>поменять валюты местами</a>
        </div>
    </div>
  );
}

export default function App() {
  return (
    <>
    <MainForm/>
    </>
  );
}