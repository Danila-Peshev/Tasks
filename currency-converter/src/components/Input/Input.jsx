export default function Input({ value, onChangeFunction }) {
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
        value={value || 0}
        onChange={handleChange}
      />
    );
  }