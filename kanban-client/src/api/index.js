import axios from 'axios';
import * as helpers from './helpers';

const API = axios.create({
    baseURL: "http://localhost:3000"
});

export default API;

export function login(email, password, success, error) {
    API.post('/auth/sign_in', {
        "email": email,
        "password": password
    })
    .then(res => {
        helpers.setHeaders(res.headers);
        success();
    })
    .catch(err => {
        error(err);
    });
}

export function getTasks(success, error) {
    API.get('/api/v1/task', { headers: helpers.getHeaders() })
    .then(res => {
        console.log(res.headers)
        helpers.setHeaders(res.headers);
        success(res.data);
    })
    .catch(err => {
        error(err);
    });
}