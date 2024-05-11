import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

//const baseURL = "https://colorlucyserver.onrender.com";
const baseURL = "http://127.0.0.1:8000/";

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
      })
      .catch((e) => {
        localStorage.clear();
        window.location.href = "/admin/login?invalid=true";
      });
  } else {
    req.headers.Authorization = `Bearer ${authTokens.access}`;
  }
  return req;
});

axiosInstance.interceptors.response.use(async (res) => {
  if (res.status === 404) {
    window.location.href = "/admin/login?invalid=true";
  }
  return res;
});
export default axiosInstance;
