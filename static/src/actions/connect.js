import {CONNECT_FAIL, CONNECT_REQUEST, CONNECT_SUCCESS} from "../constants/connect"
import {create_connection} from '../utils/http_functions';

export function connectionRequest() {
    return {
        type: CONNECT_REQUEST,
    };
}

export function connectionSuccess(token) {
    return {
        type: CONNECT_SUCCESS,
        payload: {
            token: token
        }
    }
}

export function connectionFail(error) {
    return {
        type: CONNECT_FAIL,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText,
        }
    }
}

export function register(login, password, url) {
    return function (dispatch) {
        dispatch(connectionRequest())
        return create_connection(login, password, url)
            .then(response => {
                try {
                    dispatch(connectionSuccess(response.data.token));
                } catch (e) {
                    dispatch(connectionFail({
                        response: {
                            status: 403,
                            statusText: 'Invalid connection credentials',
                        },
                    }));
                }
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    dispatch(connectionFail({
                        response: {
                            status: error.response.status,
                            statusText: "Unable to register user."
                        }
                    }))
                } else if (error.request) {
                    // The request was made but no response was received
                    dispatch(connectionFail({
                        response: {
                            status: 403,
                            statusText: "Unable to register. Server is unresponsive."
                        }
                    }))
                } else {
                    alert(error);
                }
            })
    }
}
