import graphene
from graphene import relay, Mutation, InputObjectType

from application import db
from application.models import User as UserModel
from application.graphql.base import ActiveSQLAlchemyObjectType
from graphql import GraphQLError
from sqlalchemy.exc import IntegrityError


class UserNode(ActiveSQLAlchemyObjectType):
    class Meta:
        model = UserModel
        interfaces = (relay.Node, )
        exclude_fields = ('password',)


class createUser(Mutation):

    class Arguments:
        email = graphene.String(required=True, description='email for new user')
        password = graphene.String(required=True, description='password of new user')

    ok = graphene.Boolean()
    user = graphene.Field(UserNode)
    token = graphene.String()

    @staticmethod
    def mutate(root, info, email, password):
        try:
            new_user = UserModel.create(email=email, password=password)
            token = new_user.generate_token()
            ok = True
            return createUser(ok=ok, user=new_user, token=token)
        except IntegrityError as e:
            print(str(e))
            raise GraphQLError("User '{}' already exists.".format(email))