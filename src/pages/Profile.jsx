import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import API from "../api/api";

const Profile = () => {
  const { user } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [address, setAddress] = useState(user.address || "");
  const [loading, setLoading] = useState(false);

  const updateProfile = async () => {
    setLoading(true);
    try {
      await API.put("/users/me", {
        phoneNumber,
        address,
      });
      alert("Profile updated");
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <p><b>Unique ID:</b> {user.uniqueId}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Role:</b> {user.role}</p>

      <input
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Phone Number"
        className="w-full p-2 border rounded mt-3"
      />

      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        className="w-full p-2 border rounded mt-3"
      />

      <button
        onClick={updateProfile}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default Profile;
