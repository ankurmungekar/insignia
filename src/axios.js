
import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://56683f6e8236.ngrok.io',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
});
export default instance;