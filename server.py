# import statements
from flask import Flask, redirect, url_for, request
from flask.helpers import send_from_directory
import os
import accountcreation as ac
import databasefunctions as df

# initialize Flask application
app = Flask(__name__, static_folder="front_end/build", static_url_path="/")

# render html file
@app.route("/")
def index():
   return send_from_directory(app.static_folder, "index.html")

@app.route('/newaccount', methods=['POST'])
def newaccount():
    account = request.json
    validAccount = ac.verifyNewAccount(account)
    if (not validAccount):
        return {
            "error" : True,
        }

    # TODO - valid accounts should be stored in database
    return df.storeNewAccountInDB(account)

@app.route('/studentlogin', methods=['POST'])
def studentlogin():
    user = request.json
    return df.tryLogin(user, True)

@app.route('/facultylogin', methods=['POST'])
def facultylogin():
    user = request.json
    return df.tryLogin(user, False)

if __name__ == "__main__":
   p = int(os.environ.get("PORT", 5000))
   app.run(debug=True, port=p, host='0.0.0.0')
