import Footer from "@/layouts/Footer";
import { Outlet } from "react-router";

const AuthWrapper = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center ">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default AuthWrapper;
