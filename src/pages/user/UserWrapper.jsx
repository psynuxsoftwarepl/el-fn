import React, { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import { AuthContext } from "@/contexts/Auth";
import { toast } from "react-toastify";

const UserWrapper = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please log in to access user area");
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-white text-xl animate-pulse">
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-[4.18rem] sm:pt-[5.313rem] pb-24 md:pb-8">
      <div className="my-container py-8">
        <div className="max-w-4xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserWrapper;
