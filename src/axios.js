
import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://db8587e23b04.ngrok.io',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
});
export default instance;