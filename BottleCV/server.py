from flask import Flask, request, jsonify
import os
import base64
from datetime import datetime

# Import the prediction function from bottle.py
from bottle import predecir_imagen

app = Flask(__name__)

UPLOAD_DIR = 'uploads'
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if not data or 'image' not in data:
        return jsonify({'error': 'no image provided'}), 400
    image_b64 = data['image'].split(',')[-1]
    try:
        img_data = base64.b64decode(image_b64)
    except Exception as e:
        return jsonify({'error': 'invalid base64', 'details': str(e)}), 400
    filename = os.path.join(UPLOAD_DIR, f"cap_{datetime.utcnow().strftime('%Y%m%d%H%M%S%f')}.png")
    with open(filename, 'wb') as f:
        f.write(img_data)
    # Call the prediction function
    try:
        clase = predecir_imagen(filename)
    except Exception as e:
        return jsonify({'error': 'prediction failed', 'details': str(e)}), 500
    return jsonify({'prediction': clase})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
