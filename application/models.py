from .database import CRUDMixin, db, Column, bcrypt

class User(CRUDMixin, db.Model):
    id = Column(db.Integer(), primary_key=True)
    email = Column(db.String(255), unique=True)
    password = Column(db.String(255))

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