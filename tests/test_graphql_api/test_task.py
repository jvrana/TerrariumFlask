import time


def test_create_user(graphql_client):
    query = '''
    {
        longTask
    }
    '''.strip()
    res = graphql_client.execute(query)
    print(res)
    assert not res.get('errors', None)

    long_task_id = res['data']['longTask']

    query = '''
    query getStatus($taskId: String!) {
        longTaskStatus(taskId: $taskId) {
            message
            current
            total
            status
        }
    }
    '''

    res = graphql_client.execute(query, variables={"taskId": long_task_id})
    print(res)
    assert not res.get('errors', None)

    time.sleep(5)

    res = graphql_client.execute(query, variables={"taskId": long_task_id})
    print(res)
    assert not res.get('errors', None)

