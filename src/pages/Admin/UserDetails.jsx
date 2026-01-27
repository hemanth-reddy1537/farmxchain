import { useParams } from "react-router-dom";
import StatusBadge from "../../components/Admin/StatusBadge";

const UserDetails = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black">User Profile #{id}</h1>

      {/* Info */}
      <div className="bg-white p-6 rounded shadow space-y-2">
        <p><strong>Name:</strong> Sample User</p>
        <p><strong>Role:</strong> DISTRIBUTOR</p>
        <p><strong>Status:</strong> <StatusBadge value="ACTIVE" /></p>
        <p><strong>Registered:</strong> Jan 2025</p>
        <p><strong>Last Login:</strong> Today</p>
      </div>

      {/* Admin Actions */}
      <div className="bg-white p-6 rounded shadow space-y-3">
        <h2 className="font-bold">Admin Actions</h2>
        <button className="px-4 py-2 bg-red-600 text-white rounded">
          Block User
        </button>
        <button className="px-4 py-2 bg-gray-800 text-white rounded">
          Dismiss User
        </button>
      </div>

      {/* Notes */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-bold mb-2">Admin Notes</h2>
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Add internal notes..."
        />
      </div>
    </div>
  );
};

export default UserDetails;
