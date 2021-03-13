from flask import Blueprint, render_template

bp = Blueprint(__name__, __name__, template_folder="../templates", static_folder ="../static")


@bp.route("/advanced")
def show():
    return render_template("advanced.html")
