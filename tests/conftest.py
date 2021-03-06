import pytest

from application import create_app
from application.database import db as _db
from webtest import TestApp

TEST_CONFIG = "tests.pytest_config"  # located at tests/pytest_config.py

@pytest.fixture
def app():
    """An application for the tests."""
    _app = create_app(TEST_CONFIG)
    if not _app.config['ENV'] == 'pytests':
        raise Exception("Cannot run tests, pytest config settings at '{}' are not properly loaded.".format(TEST_CONFIG))
    ctx = _app.test_request_context()
    ctx.push()

    yield _app

    ctx.pop()


@pytest.fixture
def testapp(app):
    """A Webtest app."""
    return TestApp(app)


@pytest.fixture
def db(app):
    """A database for the tests."""
    _db.app = app
    with app.app_context():
        _db.create_all()

    yield _db

    _db.session.close()
    _db.drop_all()


@pytest.fixture
def client(db):

    app = db.app

    client = app.test_client()

    with _db.app.app_context():
        _db.create_all()

    yield client
