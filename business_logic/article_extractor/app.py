from flask import Flask, jsonify, request
import os
from newspaper import Article 
import json

import requests

app = Flask(__name__)

@app.route('/')
def index():    
    return "Welcome to the Article Extractor service"

@app.route('/Article', methods=['POST']) 
def get_article():
    # get article url from post request
    article_url = request.get_json()['url']

    HTML_ADAPTER_PORT = os.environ["HTML_ADAPTER_SERVER_PORT"]

    # Send request to html adapter
    url = "http://html_adapter:" + HTML_ADAPTER_PORT + "/getHtml"
    myobj = {'url': article_url}

    x = requests.post(url, data = json.dumps(myobj), headers = {'Content-Type': 'application/json'})
    
    html = json.loads(x.text)['html']

    response = {}

    # Extract information from html
    article = Article(url)
    article.download(html)
    article.parse()

    response['title'] = article.title
    response['text'] = article.text
    response['image'] = article.top_image

    return jsonify(response)

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=os.environ["ARTICLE_EXTRACTOR_SERVICE_PORT"])
