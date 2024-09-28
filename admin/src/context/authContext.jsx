import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000;

        // Check if the token has expired
        if (decodedToken.exp < currentTime) {
          sessionStorage.removeItem("token");
          setAuthState("", "");
          navigate("/login");
        } else {
          setAuthState(storedToken, decodedToken.role);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        sessionStorage.removeItem("token");
        setAuthState("", "");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Unified function to set token and role
  const setAuthState = (newToken, newUserRole) => {
    setToken(newToken);
    setUserRole(newUserRole);

    if (newToken) {
      sessionStorage.setItem("token", newToken);
    } else {
      sessionStorage.removeItem("token");
    }
  };

  // Function to handle logout
  const logout = () => {
    setAuthState("", "");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, setAuthState, userRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
