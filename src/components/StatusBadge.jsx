const statusStyles = {
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-300",
  ACCEPTED: "bg-blue-100 text-blue-700 border-blue-300",
  DELIVERED: "bg-green-100 text-green-700 border-green-300",
  CANCELLED: "bg-red-100 text-red-700 border-red-300",
  REJECTED: "bg-gray-200 text-gray-700 border-gray-400"
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full border
        ${statusStyles[status] || "bg-gray-100 text-gray-600"}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
