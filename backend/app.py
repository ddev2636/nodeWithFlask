from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

with open("models/linear_regression_model.pkl", "rb") as f:
    model = pickle.load(f)

# Replace with the actual list of feature names your model expects
EXPECTED_FEATURES = [
    "bedrooms",
    "bathrooms",
    "sqft_living",
    "sqft_lot",
    "floors",
    "waterfront",
    "view",
    "condition",
]


@app.route("/predict", methods=["POST"])
def predict():
    try:
        features = request.get_json()

        # Validate feature presence and numerical values
        for key, value in features.items():
            if key not in EXPECTED_FEATURES:
                return jsonify({"error": f"Unexpected feature: {key}"}), 400
            try:
                # Attempt to convert value to float
                features[key] = float(value)
            except ValueError:
                return jsonify({"error": f"Non-numerical value for feature: {key}"}), 400

        # Check if all expected features are provided
        if set(features.keys()) != set(EXPECTED_FEATURES):
            return jsonify({"error": "Not all features provided"}), 400

        prediction = model.predict([list(features.values())])
        return jsonify({"prediction": prediction[0]})

    except Exception as e:
        print(f"Error making prediction: {e}")
        return jsonify({"error": "Internal server error"}), 500


if __name__ == "__main__":
    app.run(port=5000)
