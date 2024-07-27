
import axios from 'axios';
import AuthUser from './token';
// 
// const token = AuthUser();
const token = JSON.parse(sessionStorage.getItem('token'));
const API = axios.create({
    // baseURL : "http://milksubsidydairyassam.com:8800/",
    baseURL : "http://127.0.0.1:8400/",
    headers :{
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
    }
});


export default API;
