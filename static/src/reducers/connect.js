import {createReducer} from '../utils/misc'

import {CONNECT_FAIL, CONNECT_REQUEST, CONNECT_SUCCESS} from '../constants/connect';
import {REGISTER_USER_FAILURE} from "../constants/auth";


const initialState = {
    token: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

export default createReducer(initialState, {
    [CONNECT_REQUEST]: (state) =>
        Object.assign({}, state, {
            isAuthenticating: true,
            statusText: null,
        }),
    [CONNECT_SUCCESS]: (state) =>
        Object.assign({}, state, {
            isAuthenticated: true,
            isAuthenticating: false,
            statusText: "Connection was successful.",
        }),
    [CONNECT_FAIL]: (state, payload) => {
        console.log("OK");
        return Object.assign({}, state, {
            isAuthenticated: false,
            isAuthenticating: false,
            statusText: `Connection Error: ${payload.status} ${payload.statusText}`,
        })
    }
})