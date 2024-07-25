
import axios from 'axios';
// import AuthUser from './token';
// 
// const {token} = AuthUser();

const API = axios.create({
    baseURL : "http://milksubsidydairyassam.com:8800/",
    // baseURL :  process.env.REACT_APP_MAIN_API,
   
    headers :{
        "Content-Type": "application/json",
        // "Authorization" : `Bearer ${token}`
    }
});


export default API;
