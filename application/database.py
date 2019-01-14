"""
SQLAlchemcy database and model mixins
"""

from .extensions import db, bcrypt
from application.utils.auth import generate_token, verify_token

Column = db.Column
relationship = db.relationship


class CRUDMixin(object):
    """Mixin that adds convenience methods for CRUD (create, read, update, delete) operations."""

    @classmethod
    def create(cls, **kwargs):
        """Create a new record and save it the database."""
        instance = cls(**kwargs)
        return instance.save()

    def update(self, commit=True, **kwargs):
        """Update specific fields of a record."""
        for attr, value in kwargs.items():
            setattr(self, attr, value)
        return commit and self.save() or self

    def save(self, commit=True):
        """Save the record."""
        db.session.add(self)
        if commit:
            db.session.commit()
        return self

    def delete(self, commit=True):
        """Remove the record from the database."""
        db.session.delete(self)
        return commit and db.session.commit()

class PassMixin(object):

    TOKEN_FIELDS = ['id', 'email']

    @staticmethod
    def hashed_password(password):
        return bcrypt.generate_password_hash(password).decode("utf-8")

    def generate_token(self):
        return generate_token(self, keys=self.TOKEN_FIELDS)

    @classmethod
    def from_token(cls, token):
        data = verify_token(token)
        if data is None:
            return None
        model = cls.query.get(data['id'])
        return model
