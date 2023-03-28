from flask import Flask

from webapp.views.test import bp as test_bp

app = Flask(__name__, static_folder="static")

app.register_blueprint(test_bp)
