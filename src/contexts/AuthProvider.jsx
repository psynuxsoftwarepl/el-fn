// import axios from "axios";
// import { AuthContext } from "./Auth.js";

// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const baseURL =
//           import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

//         const res = await axios.get(`${baseURL}/api/v1/user/me`, {
//           withCredentials: true,
//         });

//         if (res.data?.user) {
//           setUser(res.data.user);
//           setIsAuthenticated(true);
//         } else {
//           setIsAuthenticated(false);
//         }
//       } catch (error) {
//         setIsAuthenticated(false);
//         setUser(null);
//         if (error.response?.status !== 401) {
//           toast.error("Something went wrong while checking session.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   if (loading) {
//     return (
//       <div className="h-screen flex justify-center items-center bg-[#121212] text-white">
//         <div className="text-center">
//           <p className="text-xl font-semibold mb-2 animate-pulse">
//             Checking your session...
//           </p>
//           <p className="text-sm text-gray-400">Please wait a moment</p>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         setIsAuthenticated,
//         user,
//         setUser,
//         loading,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;











import React, { useState, useEffect } from "react";
import { AuthContext } from "./Auth.js";

const AuthProvider = ({ children }) => {
  // Always authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState({
    name: "Guest User",
    email: "guest@example.com",
  });
  const [loading, setLoading] = useState(false);

  // If you want to mimic async behavior once
  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#121212] text-white">
        <div className="text-center">
          <p className="text-xl font-semibold mb-2 animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
