# ai-service/app.py
import json
from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 1. Load the extensive training data from our JSON file
with open('training_data.json', 'r') as f:
    data = json.load(f)

# Prepare the data for the model
texts = []
labels = []
for category, phrases in data.items():
    for phrase in phrases:
        texts.append(phrase)
        labels.append(category)

# 2. Upgrade the Model to understand word context using n-grams
# TfidfVectorizer(ngram_range=(1, 2)) tells the model to look at 
# individual words ("ticket") AND pairs of adjacent words ("movie ticket").
# This is how it learns context.
model = make_pipeline(TfidfVectorizer(ngram_range=(1, 2)), MultinomialNB())

# 3. Train the upgraded model on the new, larger dataset
model.fit(texts, labels)

# API endpoint remains the same
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data or 'title' not in data:
            return jsonify({"error": "Invalid input, 'title' is required"}), 400

        title = data['title']
        prediction = model.predict([title])
        
        return jsonify({"category": prediction[0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)