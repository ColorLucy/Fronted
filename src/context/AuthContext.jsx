import "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

/**
 * `AuthContext` is a context that provides authentication interfaces to the frontend.
 * It holds the authentication state, including tokens and user information, and offers
 * functions to log in and log out, using JWT for token decoding and management.
 *
 * The context also includes a check for a logged-in user and redirects to the login page if the user is not authenticated.
 *
 * @module AuthContext
 */
const AuthContext = createContext();
export default AuthContext;

/**
 * `AuthProvider` is a React component that wraps the application providing a context for authentication.
 * It initializes the authentication state from local storage and provides functions to handle
 * login and logout processes. Also, it automatically navigates users depending on their authentication status.
 *
 * @param {{ children: JSX.Element }} props - The child components that `AuthProvider` will wrap.
 * @returns {JSX.Element} A context provider wrapping its children, managing the authentication state and logic.
 */
export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(JSON.parse(localStorage.getItem("authTokens")).access)
      : null
  );
  let [loading, setLoading] = useState(true);
  let [loginError, setLoginError] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const back = queryParams.get('back');
  const navigate = useNavigate();
  let loginUser = async (e, data) => {
    localStorage.clear();
    e.preventDefault();
    const response = await axiosInstance
      .post("/auth/login/", data)
      .catch((e) => {
        setLoginError(true);
      });

    if (response.status === 200) {
      setAuthTokens(response.data);
      setUser(jwtDecode(response.data.access));
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      //axiosInstance.defaultConfig.headers.authorization = `Bearer ${response.data.access}`
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate(back ? back : "/admin");
    }
  };

  let logoutUser = (backURL) => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    console.log(location)
    navigate(`/admin/login?back=${backURL}`);
  };
  const triggerLoginRedirect = () => {
    setShowLoginRedirect(true);
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
    triggerLoginRedirect,
    loginError,
    setLoginError,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <>
      {!authTokens && location?.pathname !== "/admin/login" && (
        <Navigate replace to={`/admin/login?invalid=true&back=${location?.pathname + location?.search}`} />
      )}
      <AuthContext.Provider value={contextData}>
        {loading ? null : children}
      </AuthContext.Provider>
    </>
  );
};
