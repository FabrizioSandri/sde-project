from flask import Flask, jsonify, request, render_template
import os
import urllib.request
from urllib.request import urlopen
import json

app = Flask(__name__,
            static_url_path='', 
            static_folder='static',
            template_folder='templates')

app.secret_key = "secret_session_key"
app.config['SESSION_TYPE'] = 'filesystem'

@app.route('/')
def index():    
    return render_template("index.html")

@app.route('/login')
def login():    
    return render_template("login.html")

@app.route('/registration')
def registration():    
    return render_template("registration.html")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.environ['UI_PORT'])