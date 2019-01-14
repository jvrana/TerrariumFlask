import {graphql} from "react-apollo";
import {GET_ALL_CONNECTIONS, GET_CURRENT_SESSION} from "../graphql/queries";

export const withCurrentUser = graphql(GET_CURRENT_SESSION, {
    props: ({data}) => ({
        currentUser: data.currentSession.currentUser,
        userLoading: data.loading,
        selectedConnectionId: data.currentSession.connectionId
    }),
});

export const withConnections = graphql(GET_ALL_CONNECTIONS, {
    props: ({data}) => ({
        connections: data.allConnections
    })
});