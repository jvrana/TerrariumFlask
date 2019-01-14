import graphene
from graphene import relay, Mutation, InputObjectType, Node

from application.models import APIConnection as ConnectionModel, User, db
from application.graphql.base import ActiveSQLAlchemyObjectType
from graphql import GraphQLError


class ConnectionNode(ActiveSQLAlchemyObjectType):
    class Meta:
        model = ConnectionModel
        interfaces = (relay.Node, )
        exclude_fields = ('password',)


class createConnection(Mutation):

    class Arguments:
        name = graphene.String(required=True, description='the name for the connection')
        login = graphene.String(required=True, description='login for the connection')
        password = graphene.String(required=True, description='password for the connection (not User password!)')
        url = graphene.String(required=True, description='url for the connection')
        user_id = graphene.ID(required=True, description='user_id to attach connection to')

    ok = graphene.Boolean()
    connection = graphene.Field(ConnectionNode)
    token = graphene.String()

    @staticmethod
    def mutate(root, info, name, login, password, url, user_id):
        user = graphene.Node.get_node_from_global_id(info, user_id)
        if user is None:
            raise GraphQLError("No user with id {}".format(user_id))
        new_connection = ConnectionModel.create(name=name, login=login, password=password, url=url, user=user)
        token = new_connection.generate_token()
        ok = True
        return createConnection(ok=ok, connection=new_connection, token=token)


class editConnection(Mutation):

    class Arguments:
        id = graphene.ID(required=True, description="The (node) id of the connection")
        login = graphene.String(required=False, description='login for the connection', default_value=None)
        name = graphene.String(required=False, description='name for the connection', default_value=None)
        password = graphene.String(required=False, description='password for the connection (not User password!)', default_value=None)
        url = graphene.String(required=False, description='url for the connection', default_value=None)

    ok = graphene.Boolean()
    connection = graphene.Field(ConnectionNode)
    token = graphene.String()

    @staticmethod
    def mutate(root, info, id, **kwargs):
        login = kwargs.get('login', None)
        password = kwargs.get('password', None)
        name = kwargs.get('name', None)
        url = kwargs.get('url', None)
        node = Node.get_node_from_global_id(info, id)
        if not isinstance(node, ConnectionModel):
            raise GraphQLError("No APIConnection with global id '{}'".format(id))

        connection = node
        print("Editing connection")
        print(kwargs)
        if login:
            connection.login = login
        if password:
            connection.password = password  # TODO: hashed password for editConnection   connection.hashed_password(password)
        if name:
            connection.name = name
        if url:
            connection.url = url
        print(connection.name)
        db.session.commit()

        ok = True
        return editConnection(ok=ok, connection=connection)
