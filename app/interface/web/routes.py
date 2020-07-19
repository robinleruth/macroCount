from flask import Blueprint
from flask import render_template, make_response


bp = Blueprint('main', __name__)


@bp.route('/')
def index():
    return render_template('index.html')

@bp.route('/manifest')
def manifest():
    res = make_response(render_template('manifest.appcache'), 200)
    res.headers["Content-Type"] = "text/cache-manifest"
    return res
