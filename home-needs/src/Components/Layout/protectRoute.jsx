
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated  } = useAuth();

  return isAuthenticated  ? children : <Navigate to="/loginpage" />;
}

export default ProtectedRoute;