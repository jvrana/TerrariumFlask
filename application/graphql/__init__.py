import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField

from application.graphql.connection import ConnectionNode, createConnection
from application.graphql.user import UserNode, createUser


class UserConnection(relay.Connection):
    class Meta:
        node = UserNode


class ConnectionConnection(relay.Connection):
    class Meta:
        node = ConnectionNode


class Query(graphene.ObjectType):
    node = graphene.relay.Node.Field()
    users = graphene.List(UserNode)
    connections = graphene.List(ConnectionNode)
    # user = graphene.Field(Users)
    all_users = SQLAlchemyConnectionField(UserConnection)
    all_connections = SQLAlchemyConnectionField(ConnectionConnection)

    # def resolve_user(self, info, id):
    #     return Users.get_node(info, id)

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
