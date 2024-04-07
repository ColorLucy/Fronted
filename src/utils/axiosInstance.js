import { create, post } from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

baseURL = "http://127.0.0.1:8000"

let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;

const axiosInstance = create({ baseURL, headers: {
    Authorization: `Bearer ${authTokens?.access}`
} })

axiosInstance.interceptors.request.use(async req => {
    if(!authTokens){
        authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')): null
        req.headers.Authorization = `Bearer ${authTokens?.access}`;
    }

    const user = jwt_decode(authTokens.access)
    const isExpired = dayjs.unix( user.exp).diff(dayjs()) < 1;

    if(isExpired){
        const {data} = await post(`${baseURL}/auth/refresh`, {
            refresh: authTokens.refresh
        })
        localStorage.setItem('authTokens', JSON.stringify(data));
        req.headers.Authorization = `Bearer ${data.access}`;
    }
    
    return req
})
export default axiosInstance;