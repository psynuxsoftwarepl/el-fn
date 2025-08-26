import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/Auth";
import HexAvatar from "@/components/ui/HexagonAvatar";
import { Pencil, LogOut } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, setUser, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const baseURL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

      await axios.get(`${baseURL}/api/v1/user/logout`, {
        withCredentials: true,
      });

      setUser(null);
      setIsAuthenticated(false);
      navigate("/auth");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  // If no user data is available, show loading or redirect
  if (!user) {
    return (
      <div className="min-h-screen w-full bg-background text-white flex flex-col items-center justify-center px-4 md:px-8 py-12 mt-[5.5rem]">
        <div className="text-center">
          <p className="text-xl font-semibold mb-2 animate-pulse">
            Loading your profile...
          </p>
          <p className="text-sm text-gray-400">Please wait a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background text-white flex flex-col items-center justify-start px-4 md:px-8 py-12 mt-[5.5rem]">
      <div className="w-full max-w-md bg-[#111111] rounded-t-2xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          {user?.profilePicture ? (
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#B8A171]">
              <img
                src={user.profilePicture}
                alt={user.name || "Profile"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
              <div style={{ display: "none" }}>
                <HexAvatar
                  size={96}
                  initial={user?.name?.charAt(0).toUpperCase() || "?"}
                />
              </div>
            </div>
          ) : (
            <HexAvatar
              size={96}
              initial={user?.name?.charAt(0).toUpperCase() || "?"}
            />
          )}
        </div>

        <h1 className="text-3xl font-bold mt-2">{user?.name || "User"}</h1>
        <p className="text-lg text-gray-400 mt-1">
          {user?.phone || "Phone not provided"}
        </p>

        <button
          onClick={() => navigate("/user/bookings")}
          className="w-full mt-6 px-6 py-2 rounded-full bg-[#1a1a1a] text-white border-2 border-[#B8A171] transition-all duration-300 hover:bg-gradient-to-br hover:from-[#B8A171] hover:to-[#FFF2CC] hover:text-black"
        >
          See All Trips
        </button>

        <div className="border-t border-gray-700 w-full mt-8 mb-6"></div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Profile Details</h2>
          <button
            onClick={() => navigate("/user/edit")}
            className="p-2 rounded-full bg-[#1a1a1a] border-2 border-[#B8A171] hover:bg-gradient-to-br hover:from-[#B8A171] hover:to-[#FFF2CC] hover:text-black transition-all"
            title="Edit Profile"
          >
            <Pencil className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 text-left text-base text-gray-300">
          <Detail label="Full Name" value={user?.name} />
          <Detail label="Personal Email" value={user?.email} />
          <Detail label="Work Email" value={user?.workEmail} />
          <Detail label="Phone Number" value={user?.phone} />
          <Detail label="Home City" value={user?.homecity} />
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 w-full py-2 border border-red-400 text-red-400 rounded-full text-base hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>

      <div className="w-full max-w-md bg-[#2a2a2a] rounded-b-2xl text-center py-4 shadow-md">
        <p className="text-sm font-semibold tracking-wide text-gradient uppercase">
          {user?.createdAt
            ? `USER SINCE ${new Date(user.createdAt)
                .toLocaleDateString("en-US", { month: "long", year: "numeric" })
                .toUpperCase()}`
            : "USER SINCE AUGUST 2025"}
        </p>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <p className="text-gray-400 mb-1 text-base font-medium">{label}</p>
    <p className="font-semibold text-white text-lg">
      {value && value.trim() !== "" ? (
        value
      ) : (
        <span className="text-gray-600 italic">Not Provided</span>
      )}
    </p>
  </div>
);

export default Profile;
