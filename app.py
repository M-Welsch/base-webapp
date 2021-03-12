from flask import Flask

from webapp.views.dashboard import bp as dashboard_bp


app = Flask(__name__, static_folder="webapp/static")

app.register_blueprint(dashboard_bp)
