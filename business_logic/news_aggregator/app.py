from flask import Flask, jsonify, request
import os
import urllib.request
from urllib.request import urlopen
from werkzeug.exceptions import HTTPException
import json

app = Flask(__name__)


@app.route('/')
def index():    
    return "Welcome to the News Aggregator service"


@app.route('/news') 
def get_html():
    RSS_ADAPTER_PORT = os.environ["RSS_ADAPTER_SERVER_PORT"]
    
    # Retrieve all the feeds and merge them    
    with urllib.request.urlopen("http://rss_adapter:" + RSS_ADAPTER_PORT + "/feeds") as response: 
        response_text = response.read() 
        feed_urls = json.loads(response_text.decode('utf-8'))

    feeds=[]

    for i in feed_urls.keys():    
        with urllib.request.urlopen("http://rss_adapter:" + RSS_ADAPTER_PORT + "/fetch_feed/" + i) as response: 
            response_text = response.read() 
            feed = json.loads(response_text.decode('utf-8'))

        feeds.append(feed)
        
    return jsonify(feeds)

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
	app.run(host='0.0.0.0', port=os.environ["NEWS_AGGREGATOR_SERVICE_PORT"])
