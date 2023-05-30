import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [isAuthEmpty, setIsAuthEmpty] = useState(true);
  useEffect(() => {
    // Retrieve the authentication information from localStorage on component mount
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth && storedAuth !== undefined) {
      setAuth(JSON.parse(storedAuth));
    }
  }, [isAuthEmpty]);
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, isAuthEmpty, setIsAuthEmpty }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
