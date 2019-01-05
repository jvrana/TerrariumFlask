from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import TestingConfig
from flask_bcrypt import Bcrypt

STATIC_FOLDER = "./static/dist"
TEMPLATE_FOLDER = "./static"

app = Flask(__name__, static_folder="./static/dist", template_folder="./static")
app.config.from_object(TestingConfig)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
