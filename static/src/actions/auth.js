import {
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
} from '../constants/auth';
import history from '../history';


import {create_user, get_token, is_valid_token} from '../utils/http_functions';

export function loginUserRequest() {
    return {
        type: LOGIN_USER_REQUEST,
    };
}


export function loginUserSuccess(token) {
    localStorage.setItem('token', token);
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            token: token,
        },
    };
}

export function logout() {
    console.log("removing token");
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER,
    };
}

export function logoutAndRedirect() {
    return (dispatch) => {
        dispatch(logout());
        redirectToRoute('/');
    };
}

export function redirectToRoute(route) {
    return () => {
        history.push(route);
    };
}


export function loginUserFailure(error) {
    localStorage.removeItem('token');
    console.log(error.response.statusText);
    return {
        type: LOGIN_USER_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText,
        },
    };
}


export function loginUser(email, password) {
    return function (dispatch) {
        dispatch(loginUserRequest());
        return get_token(email, password)
            .then(response => {
                // let data = parseJSON(response);
                try {
                    dispatch(loginUserSuccess(response.data.token));
                    redirectToRoute('/home')
                } catch (e) {
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }))
                }
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    dispatch(loginUserFailure({
                        response: {
                            status: error.response.status,
                            statusText: "Invalid email or password."
                        }
                    }))
                } else if (error.request) {
                    // The request was made but no response was received
                    dispatch(loginUserFailure({
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


export function registerUserRequest() {
    return {
        type: REGISTER_USER_REQUEST,
    };
}

export function registerUserSuccess(token) {
    localStorage.setItem('token', token);
    return {
        type: REGISTER_USER_SUCCESS,
        payload: {
            token,
        },
    };
}

export function registerUserFailure(error) {
    localStorage.removeItem('token');
    return {
        type: REGISTER_USER_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText,
        },
    };
}

export function registerUser(email, password) {
    return function (dispatch) {
        dispatch(registerUserRequest());
        return create_user(email, password)
            .then(response => {
                try {
                    dispatch(registerUserSuccess(response.data.token));
                    dispatch(loginUserSuccess(response.data.token));
                } catch (e) {
                    console.log(e)
                    dispatch(registerUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token',
                        },
                    }));
                }
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    dispatch(registerUserFailure({
                        response: {
                            status: error.response.status,
                            statusText: "Unable to register user."
                        }
                    }))
                } else if (error.request) {
                    // The request was made but no response was received
                    dispatch(registerUserFailure({
                        response: {
                            status: 403,
                            statusText: "Unable to create user. Server is unresponsive."
                        }
                    }))
                } else {
                    alert(error);
                }
            })
    };
}



export function checkAuthentication() {
    return function (dispatch) {
        dispatch(loginUserRequest());
        const token = localStorage.getItem('token');
        return is_valid_token(token)
            .then(response => {
                if (response.status === 200) {
                    dispatch(loginUserSuccess(token));
                    return token;
                } else {
                    dispatch(loginUserFailure(response.error));
                    return null;
                }
            })
    }
}
