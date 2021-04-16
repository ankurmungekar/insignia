
import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://510c698a8a7c.ngrok.io',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
});
export default instance;