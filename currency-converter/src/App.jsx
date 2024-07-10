import React from 'react';

function Select({data}) {
  return (
      Object.values(data.current.data).map((currency) =>
        <option value={currency.code}>{currency.code}</option>
      )
  )
}

export default function MainForm() {
  const [fromCurrency, setFromCurrency] = React.useState("RUB");
  const [toCurrency, setToCurrency] = React.useState("EUR");
  const [fromPrice, setFromPrice] = React.useState("null");
  const [toPrice, setToPrice] = React.useState("null");
  const data = React.useRef({});

  React.useEffect(() => {
    fetch('https://api.currencyapi.com/v3/latest?apikey=cur_live_v3m1toL9UOcUiy0OylVILzh2A0IsUOFIEtEuAthJ&currencies=')
      .then((response) => response.json())
      .then((json) => {
        data.current = json;
        console.log(data.current.data);
      })
      .catch((error) => {
        console.error(error);
        alert("API Access error");
      })
  }, [])

  const onChangeFromPrice = (value) => {
    value = parseFloat(value) < 0.00 ? 0.00 : value;
    const leftPrice = (value / data.current.data[fromCurrency].value);
    const rightPrice = (leftPrice * data.current.data[toCurrency].value); 
    setFromPrice(value);
    setToPrice(rightPrice.toFixed(6));
  }

  const onChangeToPrice = (value) => {
    value = parseFloat(value) < 0.00 ? 0.00 : value;
    const leftPrice = ((data.current.data[fromCurrency].value / data.current.data[toCurrency].value) * value);
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
            <Select data={data}/>
          </select>
          <p className="in-text">в</p>
          <select className="select-from-currency" value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}> 
            <Select data={data}/>
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
          <button className="swap-button" onClick={swapCurrencies}>поменять валюты местами</button>
        </div>
    </div>
  );
}