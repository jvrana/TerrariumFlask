from flask import Blueprint, jsonify, render_template, request, g
from application.utils.auth import generate_token, requires_auth, verify_token
from sqlalchemy.exc import IntegrityError
from application.models import User, APIConnection
from application.extensions import db

bp = Blueprint('api', __name__, url_prefix='/api')


@bp.route('/', methods=['GET'])
def api():
    return jsonify({'ok': True})

#
# @api_bp.route('/', methods=['GET'])
# def index():
#     return render_template('index.html')


@bp.route('/<path:path>', methods=['GET'])
def any_root_path(path):
    return render_template('index.html')


@bp.route("/user", methods=["GET"])
@requires_auth
def get_user():
    return jsonify(result=g.current_user)


@bp.route("/create_user", methods=["POST"])
def create_user():
    incoming = request.get_json()
    try:
        user = User.create(**incoming)
    except IntegrityError as e:
        return jsonify(message="User creation failed. User with that email already exists."), 409

    return jsonify(
        id=user.id,
        token=generate_token(user)
    )


@bp.route("/get_token", methods=["POST"])
def get_token():
    incoming = request.get_json()
    user = User.get_user_with_email_and_password(incoming["email"], incoming["password"])
    if user:
        return jsonify(token=generate_token(user))

    return jsonify(error=True), 403


@bp.route("/is_token_valid", methods=["POST"])
def is_token_valid():
    try:
        incoming = request.get_json()
    except:
        return jsonify(token_is_valid=False), 403
    is_valid = verify_token(incoming["token"])

    if is_valid:
        return jsonify(token_is_valid=True)
    else:
        return jsonify(token_is_valid=False), 403


# @bp.route("/create_connection", methods=["POST"])
# def create_connection():
#     incoming = request.get_json()
#     data = dict(incoming)
#     data['user'] = user_from_token(data.pop('token'))
#     try:
#         api_connection = APIConnection.create(**data)
#     except IntegrityError as e:
#         return jsonify(message="APIConnection creation failed. User with that email already exists."), 409
#
#     return jsonify(
#         id=api_connection.id,
#         token=generate_token(api_connection, keys=['login', 'url', 'id'])
#     )

@bp.route('/user/<user_id>', methods=['GET'])
def user(user_id):
    return jsonify(User.query.filter_by(id=user_id).first())


@bp.route("/user/<user_id>/connections", methods=['GET'])
def connections(user_id):
    user = User.query.filter_by(id=user_id).first()
    return jsonify(user.api_connections)


#
# @bp.route("/create_connection", methods=["POST"])
# def create_user():
#     incoming = request.get_json()
#     user = APIConnection(
#         login=incoming["login"],
#         password=incoming["password"],
#         url=incoming["url"]
#     )
#     db.session.add(user)
#
#     try:
#         db.session.commit()
#     except IntegrityError:
#         return jsonify(message="User with that email already exists"), 409
#
#     new_user = User.query.filter_by(email=incoming["email"]).first()
#
#     return jsonify(
#         id=user.id,
#         token=generate_token(new_user)
#     )