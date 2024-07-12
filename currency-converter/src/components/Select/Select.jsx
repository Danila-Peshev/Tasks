export default function Select({ currencies, value, onChangeFunction }) {
    return (
      <select className="select-currency" 
      value={value} 
      onChange={onChangeFunction}>
        {
          Object.values(currencies).map((currency) => 
            <option key={currency.code} value={currency.code}>{currency.code}</option>
          )
        }
      </select>
    );
  }