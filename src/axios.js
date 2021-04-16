
import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://607a54c0d909.ngrok.io',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
});
export default instance;