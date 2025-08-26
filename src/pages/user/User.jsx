import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router";
import { AuthContext } from "@/contexts/Auth";

const User = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="space-y-6">
      <div className="bg-[#262626] rounded-[0.3rem] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#FFE3E5] to-[#BB878B] rounded-full flex items-center justify-center">
              <span className="text-xl sm:text-2xl text-black font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {user?.name}
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                user?.accountVerified
                  ? "bg-green-900/30 text-green-400 border border-green-400/20"
                  : "bg-yellow-900/30 text-yellow-400 border border-yellow-400/20"
              }`}
            >
              {user?.accountVerified ? "✓ Verified" : "⚠ Pending"}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-[#262626] rounded-[0.3rem] p-2">
        <div className="flex flex-col sm:flex-row gap-2">
          <NavLink
            to="/user/profile"
            className={({ isActive }) =>
              `flex-1 px-4 py-3 rounded-[0.3rem] text-center font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-[#FFE3E5] to-[#BB878B] text-black"
                  : "text-gray-400 hover:text-white hover:bg-[#434242]"
              }`
            }
          >
            👤 Profile
          </NavLink>
          <NavLink
            to="/user/bookings"
            className={({ isActive }) =>
              `flex-1 px-4 py-3 rounded-[0.3rem] text-center font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-[#FFE3E5] to-[#BB878B] text-black"
                  : "text-gray-400 hover:text-white hover:bg-[#434242]"
              }`
            }
          >
            📋 Bookings
          </NavLink>
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default User;
