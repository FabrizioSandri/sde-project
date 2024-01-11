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

@app.route('/privateArea')
def privateArea():    
    return render_template("privateArea.html")

@app.route('/news')
def news():    
    return render_template("news.html")

@app.route('/manageTeams')
def manageTeams():    
    return render_template("manageTeams.html")

@app.route('/footballFixtures')
def footballFixtures():    
    return render_template("footballFixtures.html")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.environ['UI_PORT'])