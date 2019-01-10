from functools import wraps
from flask import request, g, jsonify
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous import SignatureExpired, BadSignature
from flask import current_app

TWO_WEEKS = 1209600


def generate_token(model, expiration=TWO_WEEKS, keys=['id', 'email']):
    s = Serializer(current_app.config['SECRET_KEY'], expires_in=expiration)
    data = {k: getattr(model, k) for k in keys}
    token = s.dumps(data).decode('utf-8')
    return token


def verify_token(token):
    s = Serializer(current_app.config['SECRET_KEY'])
    try:
        data = s.loads(token)
    except (BadSignature, SignatureExpired):
        return None
    return data


def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', None)
        if token:
            string_token = token.encode('ascii', 'ignore')
            user = verify_token(string_token)
            if user:
                g.current_user = user
                return f(*args, **kwargs)

        return jsonify(message="Authentication is required to access this resource"), 401

    return decorated
