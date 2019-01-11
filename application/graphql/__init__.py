import graphene
from graphql import GraphQLError
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField

from application.graphql.connection import ConnectionNode, createConnection
from application.graphql.user import UserNode, createUser
from application.models import User


def protected(func):
    def wrapped(self, info, *args, **kwargs):
        token = info.context.token
        user = User.from_token(token)
        if not user:
            raise GraphQLError("Authentication failed")
        return func(self, info, *args, **kwargs)
    return wrapped


class UserConnection(relay.Connection):
    class Meta:
        node = UserNode


class ConnectionConnection(relay.Connection):
    class Meta:
        node = ConnectionNode


class Query(graphene.ObjectType):
    node = graphene.relay.Node.Field()
    token = graphene.String(email=graphene.String(), password=graphene.String())
    users = graphene.List(UserNode)
    connections = graphene.List(ConnectionNode)
    # user = graphene.Field(Users)
    user_from_token = graphene.Field(UserConnection, token=graphene.String())
    all_users = SQLAlchemyConnectionField(UserConnection)
    all_connections = SQLAlchemyConnectionField(ConnectionConnection)

    # def resolve_user(self, info, id):
    #     return Users.get_node(info, id)

    def resolve_token(self, info, email, password):
        user = User.get_user_with_email_and_password(email, password)
        if user is None:
            raise GraphQLError("Authentication failed")
        token = user.generate_token()
        return token

    def resolve_user_from_token(self, info, token):
        return User.from_token(token)

    @protected
    def resolve_users(self, info):
        query = UserNode.get_query(info)
        users = query.all()
        return users

    def resolve_connections(self, info):
        query = ConnectionNode.get_query(info)
        connections = query.all()
        return connections


class Mutation(graphene.ObjectType):
    create_user = createUser.Field(description='Creates a new user from an email and password')
    create_connection = createConnection.Field(description='Create a new connection')


schema = graphene.Schema(query=Query, mutation=Mutation, types=[UserNode, ConnectionNode])
