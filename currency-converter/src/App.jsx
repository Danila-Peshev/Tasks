import React from 'react';

// fetch('https://api.currencyapi.com/v3/latest?apikey=cur_live_v3m1toL9UOcUiy0OylVILzh2A0IsUOFIEtEuAthJ&currencies=')
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error(error))

const jsonData = require('./currencies.json');

function MainForm() { 
  const [fromCurrency, setFromCurrency] = React.useState("EUR");
  const [toCurrency, setToCurrency] = React.useState("RUB");
  const [fromPrice, setFromPrice] = React.useState("null");
  const [toPrice, setToPrice] = React.useState("null");

  const onChangeFromPrice = (value) => {
    if (parseFloat(value) < 0.00) {
      value = 0.00;  
    } 
    const leftPrice = (value / jsonData.data[fromCurrency].value);
    const rightPrice = (leftPrice * jsonData.data[toCurrency].value); 
    setToPrice(rightPrice.toFixed(6));
    setFromPrice(value);
  }

  const onChangeToPrice = (value) => {
    if (parseFloat(value) < 0.00) {
      value = 0.00;  
    } 
    const leftPrice = ((jsonData.data[fromCurrency].value / jsonData.data[toCurrency].value) * value);
    setToPrice(value);
    setFromPrice(leftPrice.toFixed(6));
  }

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]); 

  React.useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]); 

  // function swapCurrencies() {
  //   const prevCurrency = toCurrency;
  //   setToCurrency(fromCurrency);
  //   setFromCurrency(prevCurrency);
  // }

  return (
    <div className="main-form">
        <h1 className="title">Конвертер валют</h1>

        <div className="row-currency">
          <p className="you-are-transferring-from-text">Вы переводите из</p>
          <select className="select-from-currency" value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>  {/*FROM CURRENCY*/}
            {
              Object.values(jsonData.data).map((currency) =>
                <option value={currency.code}>{currency.code}</option>
              )
            }
          </select>

          <p className="in-text">в</p>
          <select className="select-to-currency" value={toCurrency} onChange={e => {setToCurrency(e.target.value)}}>        {/*TO CURRENCY*/}
            {
              Object.values(jsonData.data).map((currency) =>
                <option value={currency.code}>{currency.code}</option>
              )
            }
          </select>
        </div>
        
        <div className="row-values">
          <input type="number" className="from" step={1} min={1} 
          value={fromPrice} onChange={value => onChangeFromPrice(value.target.value)}></input>                     {/*FROM PRICE*/}
          <p className="equal-text">=</p>
          <input type="number" className="to" step={1} min={1} 
          value={toPrice} onChange={value => onChangeToPrice(value.target.value)}></input>                           {/*TO PRICE*/}
        </div>

        <div className="swap-text">
          {/* <a>поменять валюты местами</a> */}
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