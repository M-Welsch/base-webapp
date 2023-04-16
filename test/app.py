import os
from flask import Flask, url_for, send_file

from views.main import bp as main_bp

app = Flask(__name__, static_folder="static")

app.register_blueprint(main_bp)
js_source_path='CUSTOM_STATIC_PATH'
# set the path where you store your assets - it can be outside of the root dir
app.config[js_source_path] = os.path.abspath(os.path.join(os.path.dirname(__file__), '../webapp/static'))

# have a route listening for requests
@app.route('/webapp/static/<path:filename>')
def send_media(filename):
    path = os.path.join(app.config[js_source_path], filename)
    return send_file(path)