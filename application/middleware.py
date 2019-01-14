"""
Graphene graphQL middleware.

Middleware is register with the graphQL route upon Application creation.
"""
import sys


def authentication_middleware(next, root, info, **args):
    """Authentication middleware which expects a token of the form:
    `Bearer asdi8fy2394htqewr98tyq3`. Token is attached to the info.context and
    can be accessed by graphql routes on the server side to
    use for authentication purposes. If token is non-existant, then `info.context.token`
    is `None`"""

    auth = info.context.headers.get('Authorization', None)
    info.context.token = auth
    try:
        _, token = auth.split()
    except:
        token = None
    info.context.token = token
    return next(root, info, **args)
