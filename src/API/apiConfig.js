
import axios from 'axios';
// import AuthUser from './token';
// 
// const {token} = AuthUser();

const API = axios.create({
    // baseURL : "http://127.0.0.1:8002/api/",
    // baseURL :  process.env.REACT_APP_MAIN_API,
    baseURL :  "http://127.0.0.1:8400/",
   
    headers :{
        "Content-Type": "application/json",
        // "Authorization" : `Bearer ${token}`
    }
});


export default API;
