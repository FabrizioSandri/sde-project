from flask import Flask, request, jsonify
import os
from urllib.parse import unquote, quote
import json

import requests

app = Flask(__name__)

NEWS_AGGREGATOR_SERVICE_PORT = os.environ["NEWS_AGGREGATOR_SERVICE_PORT"]
DB_ADAPTER_SERVER_PORT = os.environ["DB_ADAPTER_SERVER_PORT"]
TEXT_SIMILARITIES_SERVER_PORT = os.environ["TEXT_SIMILARITIES_SERVER_PORT"]

# Utility functions

def get_teams(token):
    res = requests.get("http://db_adapter:" + DB_ADAPTER_SERVER_PORT + "/getTeams", 
                       data={"token": token})
    return res.text

def sort_news(data, word):

    # get all the summaries that will be sent to the text similarites service
    data_summaries = []
    for i in data:
        for j in range(len(i["entries"])):
            data_summaries.append(quote(i["entries"][j]["summary"]))

    new_data = {
        'texts': data_summaries,
        'word': word
    }         

    res = requests.post("http://text_similarities:" + TEXT_SIMILARITIES_SERVER_PORT + "/findCorrelation", json = new_data)

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

    if not auth_token:
    #     get_teams(auth_token)
    # else:
        return "Token not provided", 401
    

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
        return res.json().error, res.status_code


if __name__ == '__main__':
	app.run(host='0.0.0.0', port=os.environ["FOOTBALL_NEWS_SERVER_PORT"])