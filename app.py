from flask import Flask, render_template

app = Flask(__name__)

@app.route('/home')
def show_homepage():
    return ("HOME")
    # return render_template('base.html')