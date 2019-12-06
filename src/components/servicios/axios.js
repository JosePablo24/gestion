  
import axios from 'axios';

export const API = axios.create({
    baseURL:`http://controlbackend.ddns.net/api/v1/`
    //local
    //baseURL:`http://127.0.0.1:8000/api/v1/`
});