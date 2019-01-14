import {GET_CURRENT_SESSION} from "../../graphql/queries";
import client from '../client';


export default (_, { connectionId }, { cache }) => {
    console.log("Updating connection id...");
    const query = GET_CURRENT_SESSION;
    const prevSession = cache.readQuery({ query });

    const data = {
        currentSession: {
            ...prevSession.currentSession,
            connectionId: connectionId,
        }
    };

    cache.writeQuery({
        query,
        data
    });

    console.log(data);
    return null;
}