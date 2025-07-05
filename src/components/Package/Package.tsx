import { useState } from "react";

const Package = () => {
  const [selectedOption, setSelectedOption] = useState(2);
  const [options, setOptions] = useState<{
    [key: number]: { size: string; color: string };
  }>({
    1: { size: "S", color: "Black" },
    2: { size: "S", color: "" },
  });

  const handleSelect = (units: number) => setSelectedOption(units);

  const handleChange = (index: number, field: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [index]: { ...prev[index], [field]: value },
    }));
  };

  const packages: {
    [key: number]: {
      price: number;
      discount: number;
      discountedPrice: number;
      packageType: string;
    };
  } = {
    1: {
      price: 24.0,
      discount: 10,
      discountedPrice: 10,
      packageType: "Standard Price",
    },
    2: { price: 24.0, discount: 20, discountedPrice: 18, packageType: "" },
    3: { price: 24.0, discount: 30, discountedPrice: 24, packageType: "" },
  };

  return (
    <div className="package-container">
      <div className="header">
        <h2 className="package-title">
          <span style={{ backgroundColor: "white" }}> YAY! It's BOGO </span>
        </h2>
      </div>

      {[1, 2, 3].map((unit) => (
        <div
          key={unit}
          className={`package-option ${
            selectedOption === unit ? "selected" : ""
          }`}
          onClick={() => handleSelect(unit)}
        >
          {unit === 2 && <div className="most-popular">MOST POPULAR</div>}
          <div className="option-header">
            <div className="leftSide">
              <input
                type="radio"
                checked={selectedOption === unit}
                onChange={() => handleSelect(unit)}
              />
              <div style={{ lineHeight: "16px" }}>
                <div className="option-info">
                  <div className="unit-text">{unit} Unit</div>
                  <span className="discount-badge">
                    {packages[unit]?.discount}% off
                  </span>
                </div>
                <span className="packageType">
                  {packages[unit]?.packageType}
                </span>
              </div>
            </div>
            <div className="price-text">
              ${packages[unit]?.discountedPrice?.toFixed(2)} USD
              <br />
              <span>${packages[unit]?.price?.toFixed(2)} USD</span>
            </div>
          </div>

          {selectedOption === unit && (
            <div className="dropdown-wrapper">
                <div style={{display: "flex", gap: "0.5rem"}}>
                    <span style={{fontSize: "10px", width: "12px"}}></span>
                    <span style={{fontSize: "10px", width: "70px"}}>Size</span>
                    <span style={{fontSize: "10px", width: "70px"}}>Colour</span>
                </div>
              {[1, 2].map((i) => (
                <div key={i} className="dropdown-row">
                  <span style={{fontSize: "10px", width: "12px"}}>#{i}</span>
                  <select
                    value={options[i].size}
                    onChange={(e) => handleChange(i, "size", e.target.value)}
                    className="dropdown"
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                  </select>
                  <select
                    value={options[i].color}
                    onChange={(e) => handleChange(i, "color", e.target.value)}
                    className="dropdown"
                  >
                    <option value="">Colour</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="Pink">Pink</option>
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      
      <div className="total">
        <div className="free-delivery">Free Delivery</div>
        <span>Total : ${packages[selectedOption]?.discountedPrice} USD</span>
      </div>

      <button className="add-to-cart"><span style={{fontSize: "22px"}}>+</span> Add to Cart</button>

      <div className="powered-by">© Powered by Pumper</div>
    </div>
  );
};

export default Package;
