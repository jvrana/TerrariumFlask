from flask import Flask
from config import TestingConfig
from application import blueprints

from application.extensions import db, bcrypt, migrate


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

    return app

def register_blueprints(app):

    app.register_blueprint(blueprints.api.bp)

def register_extensions(app):

    db.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)