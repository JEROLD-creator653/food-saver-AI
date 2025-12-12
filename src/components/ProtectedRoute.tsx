import { Navigate } from "react-router-dom";
import { getUser } from "@/utils/localStorage";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = getUser();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
