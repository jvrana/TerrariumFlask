import os

here = os.path.dirname(os.path.abspath(__file__))


class BaseConfig(object):
    SECRET_KEY = "He<Zv]A!k9/bX's"
    DEBUG = True
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    STATIC_FOLDER = 'static'


class TestingConfig(BaseConfig):
    """Development configuration."""
    TESTING = True
    DEBUG = True
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    DEBUG_TB_ENABLED = True
    PRESERVE_CONTEXT_ON_EXCEPTION = False
    CELERY_BROKER_URL = 'redis://localhost:6379/0'
    CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
    CELERY_IGNORE_RESULT = False


class TestingSQLConfig(BaseConfig):
    TESTING = True
    DEBUG = True
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///{}.sql'.format(os.path.join(here, 'testing'))
    DEBUG_TB_ENABLED = True
    PRESERVE_CONTEXT_ON_EXCEPTION = False
