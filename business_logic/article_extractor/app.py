from flask import Flask, jsonify, request
import os
from newspaper import Article
from urllib.parse import unquote 
import json

import requests

app = Flask(__name__)

@app.route('/')
def index():    
    return "Welcome to the Article Extractor service"

@app.route('/article', methods = ["GET"])  
def get_article():
    
    encoded_url = request.args.get('url', '')
    decoded_url = unquote(encoded_url)

    HTML_ADAPTER_PORT = os.environ["HTML_ADAPTER_SERVER_PORT"]

    # Making a GET request with the encoded URL as a parameter
    res = requests.get("http://html_adapter:" + HTML_ADAPTER_PORT + "/getHtml?url=" + decoded_url)
    
    if res.status_code == 200:
        print("Request successful")
        html = json.loads(res.text)['html']

    response = {}

    # Extract information from html
    article = Article(decoded_url)
    article.download(html)
    article.parse()

    response['title'] = article.title
    response['text'] = article.text
    response['image'] = article.top_image

    return jsonify(response)

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=os.environ["ARTICLE_EXTRACTOR_SERVICE_PORT"])
