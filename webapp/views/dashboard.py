from pathlib import Path

from flask import Blueprint, render_template
import socket

bp = Blueprint(Path(__file__).stem, __name__, template_folder="templates", static_folder="static")


@bp.route("/")
def show() -> str:
    return render_template("dashboard.html", base_address=get_ip())


def get_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # doesn't even have to be reachable
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP