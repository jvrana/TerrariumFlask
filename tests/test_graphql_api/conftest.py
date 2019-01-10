import pytest
from graphene.test import Client
from application.graphql import schema

@pytest.fixture
def graphql_client(db):
    yield Client(schema)