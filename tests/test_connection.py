
from application.models import User
import json
from application.utils import auth
import pytest

@pytest.fixture(scope='function')
def some_user():
    return {
        "email": "one@gmail.com",
        "password": "something1"
    }