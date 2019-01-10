import graphene
from graphene import relay, Mutation, InputObjectType

from application.models import APIConnection as ConnectionModel, User
from application.graphql.base import ActiveSQLAlchemyObjectType
from graphql import GraphQLError


class ConnectionNode(ActiveSQLAlchemyObjectType):
    class Meta:
        model = ConnectionModel
        interfaces = (relay.Node, )


class createConnection(Mutation):

    class Arguments:
        login = graphene.String(required=True, description='login for the connection')
        password = graphene.String(required=True, description='password for the connection (not User password!)')
        url = graphene.String(required=True, description='url for the connection')
        user_id = graphene.ID(required=True, description='user_id to attach connection to')

    ok = graphene.Boolean()
    connection = graphene.Field(ConnectionNode)
    token = graphene.String()

    @staticmethod
    def mutate(root, info, login, password, url, user_id):
        user = graphene.Node.get_node_from_global_id(info, user_id)
        if user is None:
            raise GraphQLError("No user with id {}".format(user_id))
        new_connection = ConnectionModel.create(login=login, password=password, url=url, user=user)
        token = new_connection.generate_token()
        ok = True
        return createConnection(ok=ok, connection=new_connection, token=token)