import React from 'react';

function Select({currencies}) {
// Проверка, что объект currencies не null и не undefined
if (!currencies) {
return <option>Loading...</option>;
}

return(
Object.values(currencies).map((currency, index) =>
<option key={index} value={currency.code}>{currency.code}</option>
)
);
}

function Input({value, onChangeFunction}) {
// Проверка, что value не null и не undefined
const handleChange = (event) => {
if (event.target.value !== null) {
onChangeFunction(event.target.value);
}
};

return(
<input type="number" className="price-input" step={1} min={1}
value={value || ''} // Если value равно null, используем пустую строку
onChange={handleChange}></input>
)
}

export default function MainForm() {
const [fromCurrency, setFromCurrency] = React.useState("RUB");
const [toCurrency, setToCurrency] = React.useState("EUR");
const [fromPrice, setFromPrice] = React.useState(null);
const [toPrice, setToPrice] = React.useState(null);
const [currencies, setCurrencies] = React.useState(null);

React.useEffect(() => {
fetch('https://api.currencyapi.com/v3/latest?apikey=cur_live_3aL8lHHhS1QiGpK6jEy3wew8kSVUJgCeSyyGsaJo&currencies=')
.then((response) => response.json())
.then((json) => {
setCurrencies(json.data);
console.log(json.data)
})
.catch((error) => {
console.warn(error);
alert("API Access error");
})
}, [])

const onChangeFromPrice = (value) => {
value = parseFloat(value) < 0.00 ? 0.00 : value;
const leftPrice = currencies ? (value / currencies[fromCurrency].value) : 1;
const rightPrice = currencies ? (leftPrice * currencies[toCurrency].value) : 1;
setFromPrice(value);
setToPrice(rightPrice.toFixed(6));
}

const onChangeToPrice = (value) => {
value = parseFloat(value) < 0.00 ? 0.00 : value;
const leftPrice = currencies ? ((currencies[fromCurrency].value / currencies[toCurrency].value) * value) : 1;
setFromPrice(leftPrice.toFixed(6));
setToPrice(value);
}

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
      <select className="select-currency" value={toCurrency} onChange={e => {setToCurrency(e.target.value)}}>
        <Select currencies={currencies}/> {/* Исправление опечатки */}
    </select>
      <p className="in-text">в</p>
      <select className="select-currency" value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}> 
        <Select currencies={currencies}/> {/* Исправление опечатки */}
    </select>
    </div>
    
    <div className="row-values">
      <Input value={toPrice} onChangeFunction={onChangeToPrice} />
      <p className="equal-text">=</p>
      <Input value={fromPrice} onChangeFunction={onChangeFromPrice} />  
    </div>

    <div className="swap-text">
      <a onClick={swapCurrencies}>поменять валюты местами</a>
    </div>
</div>
);
}