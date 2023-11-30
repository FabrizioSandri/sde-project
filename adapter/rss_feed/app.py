import feedparser
from flask import Flask, jsonify
import os

app = Flask(__name__)

rss_feed_urls = { 
    1: "https://www.espn.com/espn/rss/soccer/news",
    2: "https://feeds.bbci.co.uk/sport/football/rss.xml",
    3: "https://www.ansa.it/english/english_rss.xml", #must contain "soccer:" in title
    4: "https://www.rainews.it/rss/sport",
    5: "http://rss.cnn.com/rss/edition_football.rss"     
}  

def fetch_rss_data(url):
    feed = feedparser.parse(url)    
    return {"feed_title": feed.feed.title, 'entries': feed.entries}

@app.route('/')
def index():
    return "Welcome to the RSS feed adapter"

@app.route('/feeds')
def return_feeds():    
    return jsonify(rss_feed_urls)

@app.route('/feed/<id>')
def feed(id):
    return jsonify(rss_feed_urls[int(id)])

@app.route('/fetch_feed/<id>')
def fetch_feed(id):
    """
    fetch the news from the selected feed
    """
    return jsonify(fetch_rss_data(rss_feed_urls[int(id)]))

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=os.environ["RSS_ADAPTER_SERVER_PORT"])
