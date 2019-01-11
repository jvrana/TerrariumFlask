def authentication_middleware(next, root, info, **args):
    print("Next")
    auth = info.context.headers['Authorization']
    print(auth)
    info.context.token = auth
    # TODO: only protected classes need authentication
    return next(root, info, **args)