from sqlalchemy import ForeignKey, Integer

from .database import CRUDMixin, db, Column, bcrypt, relationship


class User(CRUDMixin, db.Model):
    id = Column(db.Integer(), primary_key=True)
    email = Column(db.String(255), unique=True)
    password = Column(db.String(255))
    api_connections = relationship("APIConnection", back_populates="user")

    def __init__(self, email, password):
        self.email = email
        self.active = True
        self.password = User.hashed_password(password)

    @staticmethod
    def hashed_password(password):
        return bcrypt.generate_password_hash(password).decode("utf-8")

    @staticmethod
    def get_user_with_email_and_password(email, password):
        user = User.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return None

    def __json__(self):
        return ['id', 'email']


class APIConnection(CRUDMixin, db.Model):
    __tablename__ = 'api_connection'

    id = Column(db.Integer(), primary_key=True)
    login = Column(db.String(255), unique=True)
    password = Column(db.String(255))
    url = Column(db.String(255))
    user = relationship("User", back_populates="api_connections")
    user_id = Column(Integer, ForeignKey('user.id'))

    def __init__(self, login, password, url, user):
        self.login = login
        self.active = True
        self.password = APIConnection.hashed_password(password)
        self.url = url
        print(user)
        self.user = user

    @staticmethod
    def hashed_password(password):
        return bcrypt.generate_password_hash(password).decode("utf-8")

    def __json__(self):
        return ['id', 'login', 'url', 'user_id', 'user']
