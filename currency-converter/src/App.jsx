import React from "react";

function Select({ currencies, value, onChangeFunction }) {
  if (!currencies) {
    return <select className="select-currency"></select>;
  }

  return (
    <select className="select-currency" 
    value={value} 
    onChange={onChangeFunction}>
      {
        Object.values(currencies).map((currency, index) => 
          <option key={index} value={currency.code}>{currency.code}</option>
        )
      }
    </select>
  );
}

function Input({ value, onChangeFunction }) {
  const handleChange = (event) => {
    if (event.target.value !== null) {
      onChangeFunction(event.target.value);
    }
  };

  return (
    <input
      type="number"
      className="price-input"
      step={1}
      min={1}
      value={value || ""}
      onChange={handleChange}
    ></input>
  );
}

export default function MainForm() {
  const [fromCurrency, setFromCurrency] = React.useState("RUB");
  const [toCurrency, setToCurrency] = React.useState("EUR");
  const [fromPrice, setFromPrice] = React.useState(undefined);
  const [toPrice, setToPrice] = React.useState(undefined);
  const [currencies, setCurrencies] = React.useState(undefined);

  React.useEffect(() => {
    fetch("https://api.currencyapi.com/v3/latest?apikey=" + process.env.REACT_APP_EXAMPLE_CURRENCY_API_KEY + "&currencies=")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((json) => {
        setCurrencies(json.data);
      })
      .catch((error) => {
        console.warn(error);
        alert("API Access error: " + error.message);
      });
  }, []);

  const onChangeFromPrice = (value) => {
    if (currencies) {
      let newValue = parseFloat(value) < 0.0 ? 0.0 : value;
      const fromPriceConverted = newValue / currencies[fromCurrency].value;
      const toPriceConverted = fromPriceConverted * currencies[toCurrency].value;
      setFromPrice(newValue);
      setToPrice(toPriceConverted.toFixed(6));
    }
  };
  
  const onChangeToPrice = (value) => {
    if (currencies) {
      let newValue = parseFloat(value) < 0.0 ? 0.0 : value;
      const toPriceConverted = (currencies[fromCurrency].value / currencies[toCurrency].value) * newValue;
      setFromPrice(toPriceConverted.toFixed(6));
      setToPrice(newValue);
    }
  };

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency, currencies]);

  React.useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency, currencies]);

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
        <Select currencies={currencies} value={toCurrency} onChangeFunction={e => {setToCurrency(e.target.value)}}/>
        <p className="in-text">в</p>
        <Select currencies={currencies} value={fromCurrency} onChangeFunction={e => {setFromCurrency(e.target.value)}}/>
      </div>
      <div className="row-values">
        <Input value={toPrice} onChangeFunction={onChangeToPrice} />
        <p className="equal-text">=</p>
        <Input value={fromPrice} onChangeFunction={onChangeFromPrice} />
      </div>
      <div className="swap-text">
        <button className="swap-button" onClick={swapCurrencies}>
          поменять валюты местами
        </button>
      </div>
    </div>
  );
}
