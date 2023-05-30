import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  // Check if the auth data is available
  const isAuthenticated = !!auth?.token;
  console.log("isAuthenticated:" + isAuthenticated);
  const isAuthExist = localStorage?.getItem("auth");
  console.log("is auth exist:" + isAuthExist);
  // Check if the auth data is still being loaded
  const isLoading = Object.keys(auth).length === 0 && isAuthExist;

  // If loading, you can show a loading indicator or fallback UI
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
