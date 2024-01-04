from flask import Flask, request, jsonify, abort
from urllib.parse import unquote, quote
import os
from werkzeug.exceptions import HTTPException
import json

import requests

app = Flask(__name__)

TEXT_SIMILARITIES_SERVER_PORT = os.environ["TEXT_SIMILARITIES_SERVER_PORT"]

# routes 

@app.route('/')
def index():
    return "Welcome to the news text extractor feed adapter"

@app.route('/searchNews', methods=['POST'])
def search_news():   
     # Get the JSON data containing news titles and the target topic
    data = request.get_json()

    # Extract news titles and the target topic
    news = data.get('news', [])
    word = data.get('word', '')

    print(news)

    # get all the summaries that will be sent to the text similarites service
    data_summaries = []
    for i in news:
        for j in range(len(i["entries"])):
            data_summaries.append(quote(i["entries"][j]["summary"]))

    new_data = {
        'texts': data_summaries,
        'word': word
    }         

    res = requests.post("http://text_similarities:" + TEXT_SIMILARITIES_SERVER_PORT + "/findCorrelation", json = new_data)

    return jsonify({"texts": json.loads(res.text)["texts"]})


@app.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "status": e.name,
        "msg": e.description,
    })
    response.content_type = "application/json"
    return response



if __name__ == '__main__':
	app.run(host='0.0.0.0', port=os.environ["NEWS_TEXT_EXTRACTOR_ADAPTER_SERVER_PORT"])
