import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [features, setFeatures] = useState({
    bedrooms: "",
    bathrooms: "",
    sqft_living: "",
    sqft_lot: "",
    floors: "",
    waterfront: 0, // Initialize as numerical value (Boolean treated as 0/1)
    view: "", // Will be converted to number
    condition: "", // Will be converted to number
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFeatures({ ...features, [name]: parseFloat(value) }); // Ensure numerical values
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.target); // Get form data
    const features = Object.fromEntries(formData.entries()); // Convert data to object

    try {
      const response = await axios.post(
        "http://localhost:4000/predict",
        features
      );
      console.log(response);
      setPrediction(response.data.prediction);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.error || "Error making prediction");
    }
  };

  return (
    <div className="App">
      <h1>Linear Regression App</h1>
      <form onSubmit={handleSubmit}>
        {/* Field labels for clarity */}
        <label htmlFor="bedrooms">Bedrooms:</label>
        <input
          type="number"
          id="bedrooms"
          name="bedrooms"
          onChange={handleInputChange}
        />
        <label htmlFor="bathrooms">Bathrooms:</label>
        <input
          type="number"
          id="bathrooms"
          name="bathrooms"
          onChange={handleInputChange}
        />
        <label htmlFor="sqft_living">Sqft Living:</label>
        <input
          type="number"
          id="sqft_living"
          name="sqft_living"
          onChange={handleInputChange}
        />
        <label htmlFor="sqft_lot">Sqft Lot:</label>
        <input
          type="number"
          id="sqft_lot"
          name="sqft_lot"
          onChange={handleInputChange}
        />
        <label htmlFor="floors">Floors:</label>
        <input
          type="number"
          id="floors"
          name="floors"
          onChange={handleInputChange}
        />
        <label htmlFor="waterfront">Waterfront:</label>
        <input
          type="number"
          id="waterfront"
          name="waterfront"
          onChange={handleInputChange}
        />{" "}
        {/* Checkbox for waterfront */}
        <label htmlFor="view">View:</label>
        <input
          type="number"
          id="view"
          name="view"
          onChange={handleInputChange}
        />{" "}
        {/* Input field for view */}
        <label htmlFor="condition">Condition:</label>
        <input
          type="number"
          id="condition"
          name="condition"
          onChange={handleInputChange}
        />{" "}
        {/* Input field for condition */}
        {error && <p className="error">{error}</p>}
        {prediction && <p>Predicted Price: ${prediction.toFixed(2)}</p>}
        <button type="submit">Predict Price</button>
      </form>
    </div>
  );
}

export default App;
