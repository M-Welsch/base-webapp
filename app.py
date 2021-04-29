from flask import Flask

from webapp.views.dashboard import bp as dashboard_bp
from webapp.views.settings import bp as settings_bp
from webapp.views.advanced import bp as advanced_bp


app = Flask(__name__, static_folder="webapp/static")

app.register_blueprint(dashboard_bp)
app.register_blueprint(settings_bp)
app.register_blueprint(advanced_bp)
