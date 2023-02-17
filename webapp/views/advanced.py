from pathlib import Path

from flask import Blueprint, render_template

from webapp.util import get_ip

bp = Blueprint(Path(__file__).stem, __name__, template_folder="templates", static_folder="static")


@bp.route("/advanced")
def show() -> str:
    return render_template("advanced.html", base_address=get_ip())
