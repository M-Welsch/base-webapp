import os
from flask import Flask, send_file
from views.main import bp as main_bp

app = Flask(__name__, static_folder="static")

app.register_blueprint(main_bp)
webapp_static_path_key="WEBAPP_STATIC_PATH"
webapp_static_path_fragment="/webapp/static"
# set the path where you store your assets - it can be outside of the root dir
app.config[webapp_static_path_key] = os.path.abspath(os.path.join(os.path.dirname(__file__), ".." + webapp_static_path_fragment))

# have a route listening for requests
@app.route(webapp_static_path_fragment +  "/<path:filename>")
def send_static_asset(filename):
    path = os.path.join(app.config[webapp_static_path_key
], filename)
    return send_file(path)