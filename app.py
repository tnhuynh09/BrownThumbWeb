from flask import Flask, render_template, request, session, g, redirect
import requests

CURR_USER_KEY = "curr_user"

app = Flask(__name__)


##############################################################################
# User signup/login/logout


@app.route('/signup')
def signup():

    return render_template("signup.html")

@app.route('/login')
def login():
    return render_template("login.html")

##############################################################################
# General user routes:


@app.route('/')
def show_homepage():
    return render_template('home.html')

@app.route('/account')
def show_account():
    return render_template('account.html')

@app.route('/account/edit')
def edit_account():
    return render_template('account_edit.html')

@app.route('/search-result')
def show_search_results():
    # query = request.args["query"]
    # response = requests.get("https://brown-thumb-api.herokuapp.com/search?query=" + str(query))
    # # data = response.json()["results"]

    # return render_template("search_result.html", data=data)
    return render_template("search_result.html")

@app.route('/my-plants')
def show_plants():

    return render_template("my_plants.html")

@app.route('/journals/user-plant-id/<int:user_plant_id>')
def show_plant_journals(user_plant_id):
    
    return render_template("plant_journals.html")

@app.route('/journals/add/user-plant-id/<int:user_plant_id>')
def add_plant_journals(user_plant_id):

    return render_template("add_journal_form.html")

@app.route('/test')
def test():

    return render_template("test.html")

@app.errorhandler(404)
def page_not_found(e):
    """404 NOT FOUND page."""

    return render_template('404.html'), 404