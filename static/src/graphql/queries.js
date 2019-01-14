import gql from "graphql-tag";

export const GET_USERS = gql`
{
  users {
    id
    email
  }
}
`;

export const GET_TOKEN = gql`
    query getToken($email: String!, $password: String!) {
        token(email: $email, password: $password)
    }
`;

export const GET_CURRENT_SESSION = gql`
    query {
        currentSession @client {
            token
            currentUser
            connectionId
        }
    }    
`;


export const GET_USER_FROM_TOKEN = gql`
    query getUserFromToken($token: String!) {
        userFromToken(token: $token) {
            email
            id
        }
    }
`;

export const GET_ALL_CONNECTIONS = gql`
{
  allConnections {
    edges {
      node {
        id
        name
        url
        login
        userId
      }
    }
  }
}
`;

export const GET_CONNECTION = gql`
query getConnection($id: ID!) {
    connection(id: $id) {
        id
        name
        login
        url
        userId
    }
}
`;

export const GET_PING = gql`
query getPing($id: ID!) {
    pingConnection(id: $id) {
        id
        message
        current
        total
        status
        result
    }
}
`;

export const START_REMOTE_PING = gql`
query getPing($connectionId: ID!) {
    startPingTask(connectionId: $connectionId) {
        id
        message
        current
        total
        status
        result
    }
}
`;

export const GET_REMOTE_PING = gql`
query getPing($taskId: String!) {
    pingTaskStatus(taskId: $taskId) {
        id
        message
        current
        total
        status
        result
    }
}
`;

export const GET_TASK_STATUS = gql`
    query getStatus($taskId: String!) {
        longTaskStatus(taskId: $taskId) {
            message
            current
            total
            status
        }
    }
`;

export const GET_TASKS = gql`
    query {
        tasks @client
    }    
`;


export const START_TASK = gql`
    {
        longTask
    }
`;
