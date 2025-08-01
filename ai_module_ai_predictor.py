
# ai_predictor.py

from flask import Flask, request, jsonify
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)

# Sample dataset for demonstration purposes
data = {
    'Hour': [6, 18, 22, 10, 14, 21],
    'Day': [0, 2, 4, 6, 1, 5],
    'Temperature': [25, 33, 30, 28, 27, 29],
    'Appliance': ['AC', 'AC', 'Heater', 'Fan', 'Fan', 'Lights'],
    'Used': [1, 1, 0, 0, 1, 1]
}

# Convert to DataFrame
df = pd.DataFrame(data)

# Encode appliance names to numeric values
label_encoder = LabelEncoder()
df['ApplianceEncoded'] = label_encoder.fit_transform(df['Appliance'])

# Prepare features and labels
X = df[['Hour', 'Day', 'Temperature', 'ApplianceEncoded']]
y = df['Used']

# Train the Random Forest Classifier
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    try:
        hour = data['hour']
        day = data['day']
        temperature = data['temperature']
        appliance = data['appliance']

        # Encode the appliance input
        if appliance not in label_encoder.classes_:
            return jsonify({'error': 'Unknown appliance'}), 400

        appliance_encoded = label_encoder.transform([appliance])[0]

        # Make prediction
        prediction = model.predict([[hour, day, temperature, appliance_encoded]])
        result = 'Will be used' if prediction[0] == 1 else 'Will NOT be used'

        return jsonify({'prediction': result})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
