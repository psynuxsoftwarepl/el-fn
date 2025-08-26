import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/Auth.js";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, setUser, setIsAuthenticated } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    workEmail: "",
    homecity: "",
    phone: "",
    profilePicture: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        workEmail: user.workEmail || "",
        homecity: user.homecity || "",
        phone: user.phone || "",
        profilePicture: user.profilePicture || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const baseURL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

      const response = await axios.put(
        `${baseURL}/api/v1/user/me/update`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.user) {
        setUser(response.data.user);
        navigate("/user/profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 401) {
        toast.error("Please login again to update your profile");
      } else if (error.response?.status === 400) {
        toast.error("Please check your input data");
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword.trim()) {
      toast.error("Please enter your password to delete account");
      return;
    }

    setIsDeleting(true);
    try {
      const baseURL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

      const response = await axios.delete(`${baseURL}/api/v1/user/me`, {
        data: { password: deletePassword },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        setUser(null);
        setIsAuthenticated(false);
        navigate("/auth");
      }
    } catch (error) {
      console.error("Error deleting account:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 401) {
        toast.error("Incorrect password");
      } else if (error.response?.status === 400) {
        toast.error("Account deletion request already submitted");
      } else {
        toast.error("Failed to delete account. Please try again.");
      }
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setDeletePassword("");
    }
  };

  const DeleteAccountModal = () => {
    if (!showDeleteModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-[#111] rounded-lg max-w-md w-full p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l6.518 11.598c.75 1.335-.213 2.998-1.742 2.998H3.481c-1.529 0-2.492-1.663-1.742-2.998L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Delete Account
            </h3>
            <p className="text-gray-400 text-sm">
              This action will request account deletion. Your account will be
              permanently deleted after 30 days. You can recover it within 72
              hours by contacting support.
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Enter your password to confirm:
            </label>
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-[#222] text-white px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setDeletePassword("");
              }}
              className="flex-1 py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteAccount}
              disabled={isDeleting || !deletePassword.trim()}
              className="flex-1 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen w-full bg-background text-foreground py-10 px-4 mt-[5.5rem]">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-white">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background text-foreground py-10 px-4 mt-[5.5rem]">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Edit Profile
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-semibold">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full bg-[#111] text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-[#B8A171]"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">
              Personal Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Personal Email"
              className="w-full bg-[#111] text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-[#B8A171]"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">
              Work Email
            </label>
            <input
              type="email"
              name="workEmail"
              placeholder="Type work email"
              className="w-full bg-[#111] text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-[#B8A171]"
              value={formData.workEmail}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="w-full bg-[#111] text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-[#B8A171]"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">
              Home City
            </label>
            <select
              name="homecity"
              className="w-full bg-[#111] text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-[#B8A171]"
              value={formData.homecity}
              onChange={handleInputChange}
            >
              <option value="">Select City</option>
              <option value="Bhubaneswar">Bhubaneswar</option>
              <option value="Cuttack">Cuttack</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">
              Profile Picture URL
            </label>
            <input
              type="url"
              name="profilePicture"
              placeholder="Profile Picture URL (optional)"
              className="w-full bg-[#111] text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-[#B8A171]"
              value={formData.profilePicture}
              onChange={handleInputChange}
            />
          </div>

          <div className="bg-[#111] rounded-xl p-6 mt-8">
            <h4 className="text-sm font-semibold mb-3">Delete your account</h4>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="w-full py-3 rounded-full border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
            >
              Delete My Account
            </button>
          </div>

          <div className="flex justify-between items-center pt-6">
            <button
              type="button"
              className="text-white hover:text-gradient transition-colors"
              onClick={() => navigate("/user/profile")}
            >
              Cancel
            </button>

            <div className="p-[2px] rounded-full bg-gradient-to-br from-[#B8A171] to-[#FFF2CC]">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-[#1a1a1a] text-white rounded-full transition-all duration-300 hover:bg-gradient-to-br hover:from-[#B8A171] hover:to-[#FFF2CC] hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>

        {/* Delete Account Modal */}
        <DeleteAccountModal />
      </div>
    </div>
  );
};

export default EditProfile;
