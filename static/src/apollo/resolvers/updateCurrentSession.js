import { GET_CURRENT_SESSION } from '../../graphql/queries';
import {AUTH_TOKEN} from "../../constants";

export default (_, { user, token }, { cache }) => {
    const query = GET_CURRENT_SESSION;
    const prevSession = cache.readQuery({ query });

    const data = {
        currentSession: {
            ...prevSession.currentSession,
            currentUser: user,
            token: token
        }
    };

    cache.writeQuery({
        query,
        data
    });
    localStorage.setItem(AUTH_TOKEN, token);
    return null;
}