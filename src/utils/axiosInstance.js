import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import axiosRetry from "axios-retry";

const baseURL = "https://colorlucyserver.onrender.com";
//const baseURL = "http://127.0.0.1:8000";

let authTokens = localStorage.getItem("authTokens")
  ? JSON.parse(localStorage.getItem("authTokens"))
  : null;
const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${authTokens?.access}`,
  },
});
axiosInstance.interceptors.request.use(async (req) => {
  authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;
  if (!authTokens) return req;

  const user = jwtDecode(authTokens.access);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
  if (isExpired) {
    await axios
      .post(`${baseURL}/auth/refresh/`, {
        refresh: authTokens.refresh,
      })
      .then(({ data }) => {
        req.headers.Authorization = `Bearer ${data.access}`;
        localStorage.setItem(
          "authTokens",
          JSON.stringify({ ...authTokens, access: data.access })
        );
      }).catch(e => {
        if (!window.location.pathname.startsWith("/admin")) {
          localStorage.clear()
          return req
        }
      })
  } else {
    req.headers.Authorization = `Bearer ${authTokens.access}`;
  }
  return req;
});


axiosInstance.interceptors.response.use((response) => {
  // Cualquier código de estado que este dentro del rango de 2xx causa la ejecución de esta función 
  // Haz algo con los datos de la respuesta
  return response;
}, function (error) {
  if (error.response.status === 403 || error.response.status === 401) {
    localStorage.clear()
    if (window.location.pathname.startsWith("/admin")) {
      window.location.href = "/admin/login?invalid=true";
    }else{
      window.location.href = "/signIn?invalid=true";
    }
  }
  return Promise.reject(error);
});
axiosRetry(axiosInstance, {
  retries: 1, 
  retryDelay: (retryCount) => {
    return retryCount * 250; 
  },
  retryCondition: (error) => {
    return !(error.response.status === 403 || error.response.status === 401);
  },
});
export default axiosInstance;
