import React from 'react';
// fetch('https://api.currencyapi.com/v3/latest?apikey=cur_live_v3m1toL9UOcUiy0OylVILzh2A0IsUOFIEtEuAthJ&currencies=')
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error(error))

const currencies = [];
  const jsonData = require('./currencies.json');
  for (const key in jsonData.data) {
  currencies.push(jsonData.data[key]);
  }

function MainForm() {
  const [fromCurrency, setFromCurrency] = React.useState("USD");
  const [toCurrency, setToCurrency] = React.useState("RUB");
  const [fromPrice, setFromPrice] = React.useState(1);
  const [toPrice, setToPrice] = React.useState(888);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    console.log(newValue); 
    setFromPrice(newValue); 
  };

  

  return (
    <div className="main-form">
        <h1 className="title">Конвертер валют</h1>

        <div className="row-currency">
          <p className="you-are-transferring-from-text">Вы переводите из</p>
          <select className="select-from-currency" value={fromCurrency}>
            {currencies.map(curr =>
              <option value={curr.code}>{curr.code}</option>
            )
            }
          </select>

          <p className="in-text">в</p>
          <select className="select-to-currency" value={toCurrency}>
            {currencies.reverse().map(curr => 
            <option value={curr.code}>{curr.code}</option>)
            }
          </select>
        </div>
        
        <div className="row-values">
          <input type="number" className="from" value={fromPrice} onChange={handleInputChange}></input>
          <p className="equal-text">=</p>
          <input type="number" className="to"></input>
        </div>
        <div className="swap-text">
          <a href="#">поменять валюты местами</a>
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