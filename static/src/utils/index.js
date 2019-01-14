import {GET_USER_FROM_TOKEN} from "../graphql/queries";
import {UPDATE_SESSION} from "../graphql/mutations";

export const loginWithToken = (client, token) => {
    if (token) {
        console.log("Logging in using secret token...");
        client.query({query: GET_USER_FROM_TOKEN, variables: {token: token}}).then(({data: {userFromToken}}) => {
            client.mutate({mutation: UPDATE_SESSION, variables: {user: userFromToken, token: token}});
        });
    }
};