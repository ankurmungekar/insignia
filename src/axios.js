
import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://510c698a8a7c.ngrok.io'
});
export default instance;