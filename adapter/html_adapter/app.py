from urllib import urlopen
from flask import Flask, jsonify
import os

from urllib.request import urlopen

app = Flask(__name__)

@app.route('/')
def index():    
    fd = urlopen("http://www.python.org/")
    content = fd.read()
    fd.close()

    return jsonify(content.decode('utf8'))

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=os.environ["HTML_ADAPTER_SERVER_PORT"])
