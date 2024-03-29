import feedparser
from flask import Flask, jsonify, abort
import os
from werkzeug.exceptions import HTTPException
import json

app = Flask(__name__)

rss_feed_urls = { 
    1: "https://www.espn.com/espn/rss/soccer/news",
    2: "https://www.dailymail.co.uk/sport/football/articles.rss",
    3: "https://api.foxsports.com/v2/content/optimized-rss?partnerKey=MB0Wehpmuj2lUhuRhQaafhBjAJqaPU244mlTDK1i&size=30&tags=fs/soccer,soccer/epl/league/1,soccer/mls/league/5,soccer/ucl/league/7,soccer/europa/league/8,soccer/wc/league/12,soccer/euro/league/13,soccer/wwc/league/14,soccer/nwsl/league/20,soccer/cwc/league/26,soccer/gold_cup/league/32,soccer/unl/league/67",
    #4: "https://sports.yahoo.com/soccer/rss/" 
}  

def fetch_rss_data(url_id):
    """
    Returns the requested feed rss, all with the same structure
    """
    if len(rss_feed_urls) < url_id:
        abort(404, description="Index out of range")
    else:
        url = rss_feed_urls[url_id]
        feed = feedparser.parse(url)    

        response = {"feed_title": feed.feed.title, "entries": []}

        for entry in feed.entries:
            response["entries"].append({"title": entry.title,
                                        "link": entry.link,
                                        "summary": entry.summary})
            
            media = None

            if url_id == 1:
                media = entry.links[0]["href"]
            elif url_id == 2 or url_id == 3:
                media = entry.media_content[0]["url"]
            
            response["entries"][-1]["media_content"] = media

        return response

# routes 

@app.route('/')
def index():
    return "Welcome to the RSS feed adapter"

@app.route('/feeds')
def return_feeds():    
    return jsonify(rss_feed_urls)

@app.route('/feed/<id>')
def feed(id):
    if len(rss_feed_urls) < int(id):
        abort(404, description="Index out of range")
    else:    
        feed = rss_feed_urls[int(id)]
        return jsonify({"feed": feed})

@app.route('/fetch_feed/<id>')
def fetch_feed(id):
    """
    fetch the news from the selected feed
    """
    return jsonify(fetch_rss_data(int(id)))


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
	app.run(host='0.0.0.0', port=os.environ["RSS_ADAPTER_SERVER_PORT"])
