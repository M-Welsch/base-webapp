from pathlib import Path

from flask import Blueprint, render_template

bp = Blueprint(Path(__file__).stem, __name__, template_folder="templates", static_folder="static")


@bp.route("/")
def show() -> str:
    return render_template("dashboard.html")
