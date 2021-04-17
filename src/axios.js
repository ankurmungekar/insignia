
import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://f83894e4a51c.ngrok.io',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
});
export default instance;