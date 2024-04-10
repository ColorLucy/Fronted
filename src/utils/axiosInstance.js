import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const baseURL = "http://127.0.0.1:8000"

let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
const axiosInstance = axios.create({
    baseURL, headers: {
        Authorization: `Bearer ${authTokens?.access}`
    }
})

axiosInstance.interceptors.request.use(async req => {
    authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
    console.log("hhhhhhh")
    if (!authTokens) {
        console.alert("Fui yo...")
        window.location.href = '/admin/login?invalid=true';
        return Promise.reject()
    }

    const user = jwtDecode(authTokens.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (isExpired) {
        console.log("kk")
        await axios.post(`${baseURL}/auth/refresh/`, {
            refresh: authTokens.refresh
        }).then(data => {
            localStorage.setItem('authTokens', JSON.stringify({ ...authTokens, access: data.access }));
            req.headers.Authorization = `Bearer ${data.access}`;
            return req
        })
        localStorage.clear()
        window.location.href = '/admin/login?invalid=true';

    } else {
        req.headers.Authorization = `Bearer ${authTokens.access}`;
        return req
    }

    
})
export default axiosInstance;