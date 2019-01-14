"""database models"""

from sqlalchemy import ForeignKey, Integer
from .database import CRUDMixin, PassMixin, db, Column, bcrypt, relationship
from pydent import AqSession
from application.celery.tasks import ping_connection
# Base = declarative_base()

class User(CRUDMixin, PassMixin, db.Model):
    """Basic user model"""

    id = Column(db.Integer(), primary_key=True)
    email = Column(db.String(255), unique=True)
    password = Column(db.String(255))
    api_connections = relationship("APIConnection", back_populates="user")

    def __init__(self, email, password):
        self.email = email
        self.active = True
        self.password = User.hashed_password(password)

    @staticmethod
    def get_user_with_email_and_password(email, password):
        user = User.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return None

    def __json__(self):
        return ['id', 'email']


# TODO: safely store API connection passwords
class APIConnection(CRUDMixin, PassMixin, db.Model):
    """An APIConnection model that store login credentials for an
    api connection."""

    __tablename__ = 'api_connection'

    id = Column(db.Integer(), primary_key=True)
    name = Column(db.String(25))
    login = Column(db.String(25))
    password = Column(db.String(255))
    url = Column(db.String(255))
    user = relationship("User", back_populates="api_connections")
    user_id = Column(Integer, ForeignKey('user.id'))

    TOKEN_FIELDS = ['login', 'url', 'id']

    def __init__(self, name, login, password, url, user):
        self.name = name
        self.login = login
        self.active = True
        self.password = password  # TODO: what to do about storing passwords??? self.hashed_password(password)
        self.url = url
        self.user = user

    def session(self):
        session = AqSession(self.login, self.password, self.url)
        return session

    def ping(self):
        """Get the average request speed of the connection in seconds"""
        print("Pinging...")
        num = 5
        ping = self.session().ping(num=num)
        return ping/num

    def async_ping(self):
        session = self.session()
        task = ping_connection(session).delay()
        return task.id

    def __json__(self):
        return ['id', 'login', 'url', 'user_id', 'user']
