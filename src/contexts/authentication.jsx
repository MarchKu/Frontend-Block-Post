import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const login = async (data) => {
    try {
      setIsLoading(true);
      const result = await axios.post("https://fullstack-block-post-project-server.vercel.app/api/login", data);
      const token = result.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      setState((state) => ({
        ...state,
        user: userDataFromToken,
      }));
      setIsLoading(false);
      toast.success("Success");
      setTimeout(function () {
        navigate("/");
      }, 1000);
    } catch (error) {
      setIsLoading(false)
      toast.error("Error");
      console.error(error.message);
    }

    // Now log the state after updating
  };

  const register = async (data) => {
    try {
      setIsLoading(true);
      await axios.post("https://fullstack-block-post-project-server.vercel.app/api/register", data);
      setIsLoading(false);
      toast.success("Success");
      setTimeout(function () {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setIsLoading(false)
      toast.error("Error");
      console.error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ state, login, logout, register, isAuthenticated, isLoading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
