import axios from 'axios';

export function get_api() {
    return axios.get('/api')
}

export function create_user(email, password) {
    return axios.post('/api/create_user', {
        email,
        password,
    });
}

export function create_connection(login, password, url, token) {
    return axios.post('/api/create_connection', {
        login,
        password,
        url,
        token
    });
}

export function get_token(email, password) {
    return axios.post('/api/get_token', {
        email,
        password,
    });
}

export function is_valid_token(token) {
    return axios.post('/api/is_token_valid', {token})
}