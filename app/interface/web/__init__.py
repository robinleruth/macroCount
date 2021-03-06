from flask import Flask

from app.infrastructure.config import app_config


def create_app(config=app_config) -> Flask:
    app = Flask(__name__)
    app.config.from_object(config)

    from app.interface.web.routes import bp as main_bp
    app.register_blueprint(main_bp)

    return app

