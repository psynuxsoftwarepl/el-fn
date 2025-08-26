import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/Auth";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#121212] text-white">
        <div className="text-center">
          <p className="text-xl font-semibold mb-2 animate-pulse">
            Checking your session...
          </p>
          <p className="text-sm text-gray-400">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return children;
};

export default ProtectedRoute;
