"""GraphQL schemas"""

from functools import wraps

import graphene
from graphene import relay, Node
from graphene_sqlalchemy import SQLAlchemyConnectionField
from graphql import GraphQLError

from application.celery.tasks import long_task, ping_connection
from celery.result import AsyncResult
from application.graphql.connection import ConnectionNode, createConnection, editConnection
from application.graphql.user import UserNode, createUser
from application.models import User, APIConnection

def protected(func):
    """Require authentication to access a resolver"""

    @wraps(func)
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


class TaskStatus(graphene.ObjectType):
    id = graphene.String()
    message = graphene.String()
    current = graphene.Int()
    total = graphene.Int()
    status = graphene.String()
    result = graphene.JSONString()



class Query(graphene.ObjectType):
    node = graphene.relay.Node.Field()
    token = graphene.String(
        description="Return a token from an email and password combination.",
        email=graphene.String(),
        password=graphene.String(), )
    users = graphene.List(UserNode, description="Return all users")
    current_user = graphene.Field(UserConnection,
                                  description="Return the current user as determined by the authentication header of the request sent.")
    connections = graphene.List(ConnectionNode,
                                description="Return all connections")
    connection = graphene.Field(ConnectionNode,
                                description="Return ",
                                id=graphene.ID(required=True),
                                )
    ping_connection = graphene.Float(
        description="Return the average connection speed in seconds",
        id=graphene.ID(required=True))
    # user = graphene.Field(Users)
    user_from_token = graphene.Field(UserNode,
                                     description="Return a user from a token.",
                                     token=graphene.String())
    all_users = SQLAlchemyConnectionField(UserConnection)
    all_connections = SQLAlchemyConnectionField(ConnectionConnection)

    # TASKS
    long_task = graphene.String()
    long_task_status = graphene.Field(TaskStatus, task_id=graphene.String(required=True))

    ping_task_status = graphene.Field(TaskStatus, task_id=graphene.String(required=True))
    start_ping_task = graphene.Field(TaskStatus, connection_id=graphene.ID(required=True))

    @staticmethod
    def get_by_global_id(info, id: str, expected_type: type, fail_if_not_found=True):
        node = Node.get_node_from_global_id(info, id)
        if fail_if_not_found and not node:
            raise GraphQLError("No {} found with id '{}'".format(expected_type.__name__, id))
        if not isinstance(node, expected_type):
            raise GraphQLError(
                "No {} found with id '{}' instead found a ".format(expected_type.__name__, id, type(node)))
        return node

    def resolve_current_user(self, info):
        token = info.context.token
        current_user = User.from_token(token)
        return current_user

    def resolve_token(self, info, email, password):
        user = User.get_user_with_email_and_password(email, password)
        if user is None:
            raise GraphQLError("Authentication failed")
        token = user.generate_token()
        return token

    def resolve_user_from_token(self, info, token):
        return User.from_token(token)

    # @protected
    def resolve_users(self, info):
        query = UserNode.get_query(info)
        users = query.all()
        return users

    def resolve_connection(self, info, id):
        connection = Query.get_by_global_id(info, id, APIConnection)
        return connection

    def resolve_connections(self, info):
        query = ConnectionNode.get_query(info)
        connections = query.all()
        return connections

    def resolve_ping_connection(self, info, id):
        connection = Query.get_by_global_id(info, id, APIConnection)
        return connection.ping()

    def resolve_start_ping_task(self, info, connection_id):
        connection = Query.get_by_global_id(info, connection_id, APIConnection)
        task_id = ping_connection.apply_async(args=(connection.login, connection.password, connection.url)).id
        return Query.get_task_status(ping_connection, task_id)

    def resolve_ping_task_status(self, info, task_id):
        return Query.get_task_status(ping_connection, task_id)

    def resolve_long_task(self, info):
        task = long_task.delay()
        print(task.backend)
        return task.task_id

    @staticmethod
    def get_task_status(func, task_id):
        job = getattr(func, 'AsyncResult')(task_id)
        if job.status == "PENDING":
            message = 'not started'
            status = 'PENDING'
            current = 0
            total = 1
            result = None
        else:
            message = job.info.get('status', '')
            status = job.state
            current = job.info.get('current', 0)
            total = job.info.get('total', 1)
            result = job.info.get('result', None)
        return TaskStatus(
            id=task_id,
            message=message,
            current=current,
            total=total,
            status=status,
            result=result
        )


    def resolve_long_task_status(self, info, task_id):
        return Query.get_task_status(long_task, task_id)


class Mutation(graphene.ObjectType):
    create_user = createUser.Field(description='Creates a new user from an email and password')
    create_connection = createConnection.Field(description='Create a new connection')
    edit_connection = editConnection.Field(description="Edit a connection")


schema = graphene.Schema(query=Query, mutation=Mutation, types=[UserNode, ConnectionNode])
