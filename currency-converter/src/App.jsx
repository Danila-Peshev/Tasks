import React from 'react';
// fetch('https://api.currencyapi.com/v3/latest?apikey=cur_live_v3m1toL9UOcUiy0OylVILzh2A0IsUOFIEtEuAthJ&currencies=')
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error(error))

const jsonData = require('./currencies.json');

function MainForm() {
  const [fromCurrency, setFromCurrency] = React.useState("USD");
  const [toCurrency, setToCurrency] = React.useState("RUB");
  const [fromPrice, setFromPrice] = React.useState(1);
  const [toPrice, setToPrice] = React.useState((fromPrice * jsonData.data[toCurrency].value).toFixed(2));

  // React.useEffect(() => {
  //   setToPrice((fromPrice * jsonData.data[toCurrency].value).toFixed(2));
  //   setFromPrice((toPrice / jsonData.data[toCurrency].value).toFixed(2));
  // }, [fromCurrency, toCurrency])

  const onChangeFromPrice = (value) => {
    value = value.target.value;
    if (parseFloat(value) < 0.00) {
      value = 0.00;  
    } 
    setFromPrice(value)
    setToPrice((value * jsonData.data[toCurrency].value).toFixed(2));
  }

  const onChangeToPrice = (value) => {
    value = value.target.value;
    if (parseFloat(value) < 0.00) {
      value = 0.00;  
    } 
    setFromPrice((value / jsonData.data[toCurrency].value).toFixed(2));
    setToPrice(value);
  }



  return (
    <div className="main-form">
        <h1 className="title">Конвертер валют</h1>

        <div className="row-currency">
          <p className="you-are-transferring-from-text">Вы переводите из</p>
          <select className="select-from-currency" value={fromCurrency} onChange={e => {setFromCurrency(e.target.value)}}>  {/*FROM CURRENCY*/}
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
          <input type="number" className="from" value={fromPrice} onChange={onChangeFromPrice}></input>                     {/*FROM PRICE*/}
          <p className="equal-text">=</p>
          <input type="number" className="to" value={toPrice} onChange={onChangeToPrice}></input>                           {/*TO PRICE*/}
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