from flask import Flask
from flask_graphql import GraphQLView
from application.extensions import db, bcrypt, migrate
from application.json_encoder import AlchemyEncoder
from application.graphql import schema
from config import TestingConfig
from flask_cors import CORS
from application.middleware import authentication_middleware
from application.celery import celery

DEFAULT_CONFIG = TestingConfig

def create_app(config=None):
    print(config)
    print(__name__)
    app = Flask(__name__, static_folder="../static/dist", template_folder=".")
    if config is None:
        app.config.from_object('config.TestingSQLConfig')
    else:
        app.config.from_object(config)

    register_extensions(app)
    register_json_encoder(app)
    register_graphene(app)
    register_celery(celery, app)

    return app


def register_json_encoder(app):
    app.json_encoder = AlchemyEncoder


def register_extensions(app):
    db.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)


def register_graphene(app):

    CORS(app, resources={r'/graphql': {'origins': '*'}})

    # single url for api
    app.add_url_rule(
        '/graphql',
        view_func=GraphQLView.as_view(
            'graphql',
            schema=schema,
            graphiql=True,
            context={},
            root=4,
            middleware=[authentication_middleware],
            batch=True,
        )
    )


def register_celery(_celery, app):
    _celery.conf.update(app.config)

    class ContextTask(_celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    _celery.Task = ContextTask
    _celery.is_registered = True
    return _celery
