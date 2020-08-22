from flask import Flask, render_template, session, g

CURR_USER_KEY = "curr_user"

app = Flask(__name__)


##############################################################################
# User signup/login/logout
@app.before_request
def add_user_to_g():
    """If we're logged in, add curr user to Flask global."""

    if CURR_USER_KEY in session:
        g.user = User.query.get(session[CURR_USER_KEY])

    else:
        g.user = None

def do_login(user):
    """Log in user."""

    session[CURR_USER_KEY] = user.id

def do_logout():
    """Logout user."""

    if CURR_USER_KEY in session:
        del session[CURR_USER_KEY]

@app.route('/', methods=["GET"])
def show_homepage():
    return render_template('home.html')

@app.route('/signup', methods=["GET", "POST"])
def signup():
    return render_template("signup.html")

@app.route('/login', methods=["GET", "POST"])
def login():
    return render_template("login.html")

@app.route('/account', methods=["GET"])
def show_account():
    return render_template('account.html')

@app.route('/account/edit', methods=["GET", "POST"])
def edit_account():
    return render_template('account_edit.html')

@app.route('/search_result', methods=["GET"])
def show_search_results():
    return render_template("search_result.html")