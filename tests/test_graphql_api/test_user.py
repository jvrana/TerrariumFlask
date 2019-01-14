def test_create_user(graphql_client):
    mutation = '''
mutation myMutation {
  createUser(email: "myotheremilallkjsl2", password:"mypassword") {
    user {
      id
    }
    token
  }
}
'''.strip()
    res = graphql_client.execute(mutation)

    user_data = res['data']['createUser']
    print(user_data)
    assert user_data['token']
    assert user_data['user']['id']

    res = graphql_client.execute(mutation)
    assert 'errors' in res

def test_users(graphql_client):
    users = graphql_client.execute('''{ users { id } }''')
    print(users)


def test_connection(graphql_client):
    mutation = '''
    mutation myMutation {
      createUser(email: "myotheremilallkjsl2", password:"mypassword") {
        user {
          id
        }
        token
      }
    }
    '''.strip()
    res = graphql_client.execute(mutation)
    mutation_data = res['data']['createUser']
    token = mutation_data['token']
    user_id = mutation_data['user']['id']
    print(token)


    connection_mutation = '''
    mutation myMutation($user_id: ID!) {
      createConnection(name: "mynewconnection", login: "mylogin", password: "mypassword", url: "myurl", userId: $user_id) {
        connection {
            id
        }
      }
    }
    '''.strip()

    res = graphql_client.execute(connection_mutation, variables={'user_id': user_id})
    assert not res.get('errors', None)
    connection_id = res['data']['createConnection']['connection']['id']

    edit_mutation = '''
    mutation editConnection($id: ID!) {
        editConnection(id: $id) {
            connection {
                id
            }   
        }
    }
    '''

    res = graphql_client.execute(edit_mutation, variables={'id': connection_id})
    assert not res.get('errors', None)