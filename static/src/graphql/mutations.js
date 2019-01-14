import gql from 'graphql-tag';

export const UPDATE_SESSION = gql`
    mutation updateCurrentSession($user: User!, $token: String!) {
        updateCurrentSession(user: $user, token: $token) @client {
            currentUser
            token
        }
    }    
`;

export const UPDATE_CONNECTION = gql`
    mutation updateSelectedConnection($connectionId: ID!) {
        updateSelectedConnection(connectionId: $connectionId) @client
    }
`;

export const CREATE_USER = gql`
   mutation createUser($email: String!, $password: String!) {
      createUser(email: $email, password: $password) {
        user {
          id
          email
        }
        token
      }
    }
`;

export const CREATE_CONNECTION = gql`
    mutation createConnection($userId: ID!, $login: String!, $password: String!, $url: String! $name: String!) {
      createConnection(login: $login, password: $password, url: $url, userId: $userId, name: $name) {
        connection {
            id
        }
      }
    }
`;

export const EDIT_CONNECTION = gql`
    mutation editConnection($id: ID!, $name: String, $login: String, $url: String, $password: String) {
        editConnection(id: $id, name: $name, login: $login, url: $url, password: $password) {
            connection {
                id
                name
                login
                url
            }   
        }
    }
`;

export const UPDATE_TASK = gql`
    mutation updateTask($id: ID!, $message: String, $status: String, $current: Int, $total: Int) {
        updateTask(id: $id, message: $message, status: $status, current: $current, total: $total) @client {
            taskId
            status
            message
            current
            total
        }
    }
`;