from flask import Flask, render_template, request, session, g, redirect
import requests

CURR_USER_KEY = "curr_user"

app = Flask(__name__)


##############################################################################
# User signup/login/logout


# @app.before_request
# def add_user_to_g():
#     """If we're logged in, add curr user to Flask global."""

#     if CURR_USER_KEY in session:
#         g.user = User.query.get(session[CURR_USER_KEY])

#     else:
#         g.user = None

# def do_login(user):
#     """Log in user."""

#     session[CURR_USER_KEY] = user.id

# def do_logout():
#     """Logout user."""

#     if CURR_USER_KEY in session:
#         del session[CURR_USER_KEY]

@app.route('/signup', methods=["GET", "POST"])
def signup():

    return render_template("signup.html")

@app.route('/login', methods=["GET", "POST"])
def login():
    return render_template("login.html")

# @app.route('/logout')
# def logout():
#     """Handle logout of user."""

#     # do_logout()
#     flash("You have successfully logged out.", 'success')
#     return redirect("/login")

##############################################################################
# General user routes:


@app.route('/', methods=["GET"])
def show_homepage():
    return render_template('home.html')




@app.route('/account', methods=["GET"])
def show_account():
    return render_template('account.html')

@app.route('/account/edit', methods=["GET", "POST"])
def edit_account():
    return render_template('account_edit.html')

@app.route('/search-result', methods=["GET"])
def show_search_results():
    query = request.args["query"]
    response = requests.get("https://brown-thumb-api.herokuapp.com/search?query=" + str(query))
    data = response.json()["results"]

    return render_template("search_result.html", data=data)



@app.route('/test')
def test():

    return render_template("test.html")