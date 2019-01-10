import json

import pytest

from application.models import User


@pytest.fixture(scope='function')
def some_user():
    return {
        "email": "one@gmail.com",
        "password": "something1"
    }


def test_create_new_user(some_user, client):
    assert not User.query.filter_by(
        email=some_user["email"]
    ).first()

    res = client.post(
        "/api/create_user",
        data=json.dumps(some_user),
        content_type='application/json'
    )

    token = res.json['token']

    user_id = res.json['id']

    # should find the newly created user
    user = client.get('/api/user/{}'.format(user_id)).json
    assert user

    print(user)

    # should return no connections
    connections = client.get('/api/user/{}/connections'.format(user_id)).json
    assert connections == []

    # create new connection
    res = client.post('/api/create_connection',
                data=json.dumps({
        'token': token,
        'login': 'mylogin',
        'password': 'mypassword',
        'url': 'some url',
    }),
                content_type='application/json')
    assert res.status_code == 200
    print(res.json)
    connections = client.get('/api/user/{}/connections'.format(user_id)).json
    assert connections
