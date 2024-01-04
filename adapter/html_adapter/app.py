from flask import Flask, request, jsonify
import os
from urllib.request import urlopen
from urllib.parse import unquote
from werkzeug.exceptions import HTTPException
import json

app = Flask(__name__)

@app.route('/')
def index():    
    return "Welcome to the HTML adapter"

@app.route('/getHtml', methods = ["GET"]) 
def article_html():

    encoded_url = request.args.get('url', '')
    decoded_url = unquote(encoded_url)
    
    fd = urlopen(decoded_url)         
    content = fd.read()
    fd.close()

    return jsonify({"html": content.decode('utf8')})

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
	app.run(host='0.0.0.0', port=os.environ["HTML_ADAPTER_SERVER_PORT"])
