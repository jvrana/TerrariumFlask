from flask import Flask

from application import blueprints
from application.extensions import db, bcrypt, migrate
from application.json_encoder import AlchemyEncoder
from config import TestingConfig


def create_app(config=None):
    app = Flask(__name__, static_folder="../static/dist", template_folder=".")
    app.config.from_object(TestingConfig)

    if config is None:
        app.config.from_object('config.TestingSQLConfig')
    else:
        print("FROM CONFIG " + config)
        app.config.from_object(config)

    register_extensions(app)
    register_blueprints(app)
    register_json_encoder(app)

    return app


def register_json_encoder(app):
    app.json_encoder = AlchemyEncoder


def register_blueprints(app):
    app.register_blueprint(blueprints.api.bp)


def register_extensions(app):
    db.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)
