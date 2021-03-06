
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


@pytest.mark.usefixtures('client')
class TestUser:

    default_user = {
        "email": "default@gmail.com",
        "password": "something2"
    }
    some_user = {
        "email": "one@gmail.com",
        "password": "something1"
    }


    def test_create_new_user(self, client):
        assert not User.query.filter_by(
            email=self.some_user["email"]
        ).first()

        res = client.post(
            "/api/create_user",
            data=json.dumps(self.some_user),
            content_type='application/json'
        )
        assert res.status_code == 200
        assert json.loads(res.data.decode('utf-8'))['token']

        assert User.query.filter_by(email=self.some_user['email']).first().email == self.some_user['email']

        res2 = client.post(
            "/api/create_user",
            data=json.dumps(self.some_user),
            content_type='application/json'
        )

        assert res2.status_code == 409

    def test_get_user(self, client):
        assert not User.query.filter_by(
            email=self.some_user["email"]
        ).first()

        res = client.post(
            "/api/create_user",
            data=json.dumps(self.some_user),
            content_type='application/json'
        )

        user_id = res.json['id']

        user = client.get('/api/user/{}'.format(user_id))
        assert user

    def test_get_token_and_verify_token(self, client):
        res = client.post(
                "/api/get_token",
                data=json.dumps(self.default_user),
                content_type='application/json'
        )

        token = json.loads(res.data.decode("utf-8"))["token"]
        self.assertTrue(auth.verify_token(token))
        self.assertEqual(res.status_code, 200)

        res2 = client.post(
                "/api/is_token_valid",
                data=json.dumps({"token": token}),
                content_type='application/json'
        )

        self.assertTrue(json.loads(res2.data.decode("utf-8")), ["token_is_valid"])

        res3 = client.post(
                "/api/is_token_valid",
                data=json.dumps({"token": token + "something-else"}),
                content_type='application/json'
        )

        self.assertEqual(res3.status_code, 403)

        res4 = client.post(
                "/api/get_token",
                data=json.dumps(self.self.some_user),
                content_type='application/json'
        )

        self.assertEqual(res4.status_code, 403)

    def test_protected_route(self, client):
        headers = {
            'Authorization': self.token,
        }

        bad_headers = {
            'Authorization': self.token + "bad",
        }

        response = client.get('/api/user', headers=headers)
        self.assertEqual(response.status_code, 200)
        response2 = client.get('/api/user')
        self.assertEqual(response2.status_code, 401)
        response3 = client.get('/api/user', headers=bad_headers)
        self.assertEqual(response3.status_code, 401)
#
#
# def test_get_token_and_verify_token(self):
#
# class TestAPI(BaseTestConfig):
#     some_user = {
#         "email": "one@gmail.com",
#         "password": "something1"
#     }
#
#     # def test_get_spa_from_index(self):
#     #     result = self.app.get("/")
#     #     self.assertIn('<html>', result.data.decode("utf-8"))
#
#     def test_create_new_user(self):
#         self.assertIsNone(User.query.filter_by(
#                 email=self.some_user["email"]
#         ).first())
#
#         res = self.app.post(
#                 "/api/create_user",
#                 data=json.dumps(self.some_user),
#                 content_type='application/json'
#         )
#         self.assertEqual(res.status_code, 200)
#         self.assertTrue(json.loads(res.data.decode("utf-8"))["token"])
#         self.assertEqual(User.query.filter_by(email=self.some_user["email"]).first().email, self.some_user["email"])
#
#         res2 = self.app.post(
#                 "/api/create_user",
#                 data=json.dumps(self.some_user),
#                 content_type='application/json'
#         )
#
#         self.assertEqual(res2.status_code, 409)
#
#     def test_get_token_and_verify_token(self):
#         res = self.app.post(
#                 "/api/get_token",
#                 data=json.dumps(self.default_user),
#                 content_type='application/json'
#         )
#
#         token = json.loads(res.data.decode("utf-8"))["token"]
#         self.assertTrue(auth.verify_token(token))
#         self.assertEqual(res.status_code, 200)
#
#         res2 = self.app.post(
#                 "/api/is_token_valid",
#                 data=json.dumps({"token": token}),
#                 content_type='application/json'
#         )
#
#         self.assertTrue(json.loads(res2.data.decode("utf-8")), ["token_is_valid"])
#
#         res3 = self.app.post(
#                 "/api/is_token_valid",
#                 data=json.dumps({"token": token + "something-else"}),
#                 content_type='application/json'
#         )
#
#         self.assertEqual(res3.status_code, 403)
#
#         res4 = self.app.post(
#                 "/api/get_token",
#                 data=json.dumps(self.some_user),
#                 content_type='application/json'
#         )
#
#         self.assertEqual(res4.status_code, 403)
#
#     def test_protected_route(self):
#         headers = {
#             'Authorization': self.token,
#         }
#
#         bad_headers = {
#             'Authorization': self.token + "bad",
#         }
#
#         response = self.app.get('/api/user', headers=headers)
#         self.assertEqual(response.status_code, 200)
#         response2 = self.app.get('/api/user')
#         self.assertEqual(response2.status_code, 401)
#         response3 = self.app.get('/api/user', headers=bad_headers)
#         self.assertEqual(response3.status_code, 401)
