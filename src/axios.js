
import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://62e36c1b870b.ngrok.io',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
});
export default instance;