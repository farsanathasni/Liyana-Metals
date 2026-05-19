import { Navigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

function AdminRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/loginpage" />;
  }

  return user.role === "admin"
    ? children
    : <Navigate to="/" />;
}

export default AdminRoute;