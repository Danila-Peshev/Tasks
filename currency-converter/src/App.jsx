import React from 'react';

// fetch('https://api.currencyapi.com/v3/latest?apikey=cur_live_v3m1toL9UOcUiy0OylVILzh2A0IsUOFIEtEuAthJ&currencies=')
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error(error))

const jsonData = require('./currencies.json');

function MainForm() { 
  const [fromCurrency, setFromCurrency] = React.useState("RUB");
  const [toCurrency, setToCurrency] = React.useState("EUR");
  const [fromPrice, setFromPrice] = React.useState("null");
  const [toPrice, setToPrice] = React.useState("null");

  const onChangeFromPrice = (value) => {
    if (parseFloat(value) < 0.00) {
      value = 0.00;  
    } 
    const leftPrice = (value / jsonData.data[fromCurrency].value);
    const rightPrice = (leftPrice * jsonData.data[toCurrency].value); 
    setFromPrice(value);
    setToPrice(rightPrice.toFixed(6));
  }

  const onChangeToPrice = (value) => {
    if (parseFloat(value) < 0.00) {
      value = 0.00;  
    } 
    const leftPrice = ((jsonData.data[fromCurrency].value / jsonData.data[toCurrency].value) * value);
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
    const prevPrice = fromPrice;
    setFromCurrency(prevCurrency);
    setToCurrency(fromCurrency);
    //setFromPrice(prevPrice);
    //setToPrice(prevPrice);
  }

  return (
    <div className="main-form">
        <h1 className="title">Конвертер валют</h1>

        <div className="row-currency">
          <p className="you-are-transferring-from-text">Вы переводите из</p>
          <select className="select-to-currency" value={toCurrency} onChange={e => {setToCurrency(e.target.value)}}>        {/*TO CURRENCY*/}
            {
              Object.values(jsonData.data).map((currency) =>
                <option value={currency.code}>{currency.code}</option>
              )
            }
          </select>
          <p className="in-text">в</p>
          <select className="select-from-currency" value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>  {/*FROM CURRENCY*/}
            {
              Object.values(jsonData.data).map((currency) =>
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