from flask import Flask, request, jsonify
import os
from urllib.request import urlopen
from urllib.parse import unquote

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

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=os.environ["HTML_ADAPTER_SERVER_PORT"])
