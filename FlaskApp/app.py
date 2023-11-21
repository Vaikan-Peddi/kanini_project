import pickle
import joblib
import re
import numpy as np
from flask import Flask, request, jsonify
app = Flask(__name__)

from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
ps = PorterStemmer()

all_stopwords = stopwords.words('english')
all_stopwords.remove('not')

with open('../Model/vec.pkl', 'rb') as file:
    loaded_vec = pickle.load(file)

loaded_model = joblib.load('../Model/model.joblib')

def preprocess_text(input_text):
    review = re.sub('[^a-zA-Z]', ' ', input_text)
    review = review.lower()
    review = review.split()
    review = [ps.stem(word) for word in review if not word in set(all_stopwords)]
    review = ' '.join(review)

    return review

def predict_text(input_text):
    x = loaded_vec.transform([preprocess_text(input_text)]).toarray()
    y = loaded_model.predict(x)
    return str(y[0])

@app.route('/api/v1/predict', methods=['POST'])
def predictor():
    data = request.get_json()
    input_data = data['input_string']
    out = predict_text(input_data)
    return jsonify({'result': out})

if __name__ == '__main__':
    app.run(port=5000)