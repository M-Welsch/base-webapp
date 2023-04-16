from flask import Flask

from webapp.views.advanced import bp as advanced_bp
from webapp.views.backup_viewer import bp as backup_viewer_bp
from webapp.views.dashboard import bp as dashboard_bp
from webapp.views.log_viewer import bp as log_viewer_bp
from webapp.views.settings import bp as settings_bp

app = Flask(__name__, static_folder="static")

app.register_blueprint(dashboard_bp)
app.register_blueprint(settings_bp)
app.register_blueprint(backup_viewer_bp)
app.register_blueprint(log_viewer_bp)
app.register_blueprint(advanced_bp)
