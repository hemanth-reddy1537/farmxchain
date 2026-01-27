import { useEffect, useState } from "react";
import API from "../../api/api";
import toast from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    API.get("/users/me")
      .then((res) => {
        setUser(res.data);
        setPhone(res.data.phone || "");
        setAddress(res.data.address || "");
      })
      .catch(() => toast.error("Failed to load profile"));
  }, []);

  const updateProfile = () => {
    API.put("/users/me", { phone, address })
      .then(() => toast.success("Profile updated"))
      .catch(() => toast.error("Update failed"));
  };

  if (!user) return null;

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>

      <input
        disabled
        value={user.email}
        className="w-full p-2 mb-3 border rounded bg-gray-100"
      />

      <input
        disabled
        value={user.role}
        className="w-full p-2 mb-3 border rounded bg-gray-100"
      />

      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        className="w-full p-2 mb-3 border rounded"
      />

      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        className="w-full p-2 mb-3 border rounded"
      />

      <button
        onClick={updateProfile}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
};

export default Profile;
