from flask import Flask
from flask_graphql import GraphQLView
from application.extensions import db, bcrypt, migrate
from application.json_encoder import AlchemyEncoder
from application.graphql import schema
from config import TestingConfig
from flask_cors import CORS
from application.middleware import authentication_middleware

def create_app(config=None):
    app = Flask(__name__, static_folder="../static/dist", template_folder=".")
    app.config.from_object(TestingConfig)

    if config is None:
        app.config.from_object('config.TestingSQLConfig')
    else:
        print("FROM CONFIG " + config)
        app.config.from_object(config)

    register_extensions(app)
    register_json_encoder(app)
    register_graphene(app)

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

