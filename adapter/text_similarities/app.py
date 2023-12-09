from flask import Flask, request, jsonify
from urllib.parse import unquote, quote
import os
import spacy

app = Flask(__name__)

# Load the spacy model for similarity
nlp = spacy.load("en_core_web_sm")

@app.route('/')
def index():    
    return "Welcome to the Text Similarities API"

"""
Returns the 10 texts most similar to the word
"""
@app.route('/findCorrelation', methods=['POST'])
def find_correlation():
    # Get the JSON data containing news titles and the target topic
    data = request.get_json()

    # Extract news titles and the target topic
    texts = data.get('texts', [])
    word = data.get('word', '')

    # Calculate similarity for each news title with the target topic
    similarity_scores = {}
    decoded_texts = []
    for text in texts:
        decoded_texts.append(unquote(text))
    processed_texts = nlp.pipe(decoded_texts)
    processed_word = nlp(word)
    c = 0
    for text in processed_texts:
        #text = unquote(text)
        similarity_scores[texts[c]] = text.similarity(processed_word)
        c +=1

    # Sort titles by similarity score in descending order
    sorted_texts = sorted(similarity_scores.items(), key=lambda x: x[1], reverse=True)

    # Return the 3 most correlated news titles with their similarity scores
    correlated_texts = [{'text': text, 'similarity_score': score} for text, score in sorted_texts]
    return jsonify({'texts': correlated_texts[:10]})


if __name__ == '__main__':
	app.run(host='0.0.0.0', port=os.environ["TEXT_SIMILARITIES_SERVER_PORT"])
