import requests
from flask import Flask
from flask import request
from flask import render_template
from requests_oauthlib import OAuth1

app = Flask(__name__)

auth = OAuth1('d675df9f797747cebd5992fe586cbd5b', '29c7046d48684b25a8189734d968e473')

@app.route("/")
def hello():
    return render_template('index.html')

@app.route("/icon/")
def icon():
    # import pdb; pdb.set_trace()
    query = request.args.get('icon')
    endpoint = 'http://api.thenounproject.com/icons/%s?limit_to_public_domain=1&limit=1' % (query,)
    response = requests.get(endpoint, auth=auth)
    # if response.status_code == 200:
    #     return response.text
    # else:
    #     return 'error'
    return response.text

if __name__ == "__main__":
    app.run(debug=True)