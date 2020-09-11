from flask import Flask, render_template, request, session, g, redirect
import requests

CURR_USER_KEY = "curr_user"

app = Flask(__name__)

@app.route('/signup')
def signup():
    """Signup route."""

    return render_template("signup.html")

@app.route('/login')
def login():
    """Login route."""

    return render_template("login.html")

@app.route('/')
def show_homepage():
    """Homepage route."""

    return render_template('home.html')

@app.route('/account')
def show_account():
    """Show user profile route."""

    return render_template('account.html')

@app.route('/account/edit')
def edit_account():
    """Edit user profile route."""

    return render_template('account_edit.html')

@app.route('/search-result')
def show_search_results():
    """Show search result route."""

    return render_template("search_result.html")

@app.route('/my-plants')
def show_plants():
    """Show all user's plants route."""

    return render_template("my_plants.html")

@app.route('/journals/user-plant-id/<int:user_plant_id>')
def show_plant_journals(user_plant_id):
    
    return render_template("plant_journals.html")

@app.route('/journals/add/user-plant-id/<int:user_plant_id>')
def add_plant_journals(user_plant_id):

    return render_template("add_journal_form.html")

@app.errorhandler(404)
def page_not_found(e):
    """404 NOT FOUND page."""

    return render_template('404.html'), 404