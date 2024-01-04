from flask import Flask, request, jsonify, abort
from flask_cors import CORS
import os
from urllib.parse import unquote, quote
import json
from werkzeug.exceptions import HTTPException

import requests

app = Flask(__name__)
CORS(app)

NEWS_AGGREGATOR_SERVICE_PORT = os.environ["NEWS_AGGREGATOR_SERVICE_PORT"]
DB_ADAPTER_SERVER_PORT = os.environ["DB_ADAPTER_SERVER_PORT"]
NEWS_TEXT_EXTRACTOR_ADAPTER_SERVER_PORT = os.environ["NEWS_TEXT_EXTRACTOR_ADAPTER_SERVER_PORT"]

# Utility functions

def sort_news(data, word):

    # send all the new to the adapter
    new_data = {
        'news': data,
        'word': word
    }         
    

    res = requests.post("http://news_text_extractor:" + NEWS_TEXT_EXTRACTOR_ADAPTER_SERVER_PORT + "/searchNews", json = new_data)

    data_to_return = []

    if res.status_code == 200:
        for k in json.loads(res.text)["texts"]:
            for i in data:
                for j in range(len(i["entries"])):
                    
                    if i["entries"][j]["summary"] == unquote(unquote(k['text'])):
                        data_to_return.append(i["entries"][j])

        return jsonify(data_to_return)
    else:
        return res.text, res.status_code
    
# Routes
@app.route('/')
def index():    
        return "Welcome to the Football News Service"

# get all the news summaries from the rss feed
@app.route('/news')
def get_news():       
    res = requests.get("http://news_aggregator:" + NEWS_AGGREGATOR_SERVICE_PORT + "/news")

    auth_token =  request.headers.get('x-access-token')
    sort_word = request.args.get('search', '')

    # if not auth_token:
    # #     get_teams(auth_token)
    # # else:
    #     abort(401, description="Token not provided")
    

    if res.status_code == 200:
        data = res.json()

        # if a word that filters news is chosen, than return the filtered news
        # otherwise return all the news
        if sort_word:     
            return sort_news(data, sort_word)         
            
        return data, 200
    else:
        return res.json().error, res.status_code

# get the whole body of a news through the html extractor
@app.route('/news/article')
def get_full_news():
    encoded_url = request.args.get('url', '')
    decoded_url = unquote(encoded_url)

    ARTICLE_EXTRACTOR_SERVICE_PORT = os.environ["ARTICLE_EXTRACTOR_SERVICE_PORT"]
    res = requests.get("http://article_extractor:" + ARTICLE_EXTRACTOR_SERVICE_PORT + "/article",
                       params = {"url": encoded_url})

    if res.status_code == 200:
        data = res.json()
        return data, 200
    else:
        abort(res.status_code, res.json().msg)
    

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
	app.run(host='0.0.0.0', port=os.environ["FOOTBALL_NEWS_SERVER_PORT"])