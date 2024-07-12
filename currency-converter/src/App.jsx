import { useState, useEffect } from "react";

import Select from "./components/Select/Select";
import Input  from "./components/Input/Input";

export default function MainForm() {
  const [fromCurrency, setFromCurrency] = useState("RUB");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [fromPrice, setFromPrice] = useState();
  const [toPrice, setToPrice] = useState();
  const [currencies, setCurrencies] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.currencyapi.com/v3/latest?apikey=cur_live_3aL8lHHhS1QiGpK6jEy3wew8kSVUJgCeSyyGsaJo&currencies=");
      try {
        if (!response.ok) {
          throw new Error("An error has occured: " + response.status);
        }
        const result = await response.json();
        setCurrencies(result.data);
      } catch (err) {
        alert(err);
      }
    })();
  }, []);

  const onChangeFromPrice = (value) => {
    if (currencies) {
      const newValue = parseFloat(value) < 0.0 ? 0.0 : value;
      const fromPriceConverted = newValue / currencies[fromCurrency].value;
      const toPriceConverted = fromPriceConverted * currencies[toCurrency].value;
      setFromPrice(newValue);
      setToPrice(toPriceConverted.toFixed(6));
    }
  };
  
  const onChangeToPrice = (value) => {
    if (currencies) {
      const newValue = parseFloat(value) < 0.0 ? 0.0 : value;
      const toPriceConverted = (currencies[fromCurrency].value / currencies[toCurrency].value) * newValue;
      setFromPrice(toPriceConverted.toFixed(6));
      setToPrice(newValue);
    }
  };

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency, currencies]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency, currencies]);

  function swapCurrencies() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  if (!currencies) {
    return (
      <></>
    )
  }

  return (
    <>
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
      </>
  );
}
