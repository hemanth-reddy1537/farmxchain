const statusStyles = {
  PLACED: "bg-gray-500",
  ACCEPTED: "bg-blue-500",
  SHIPPED: "bg-orange-500",
  DELIVERED: "bg-green-600",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`px-3 py-1 text-xs text-white rounded-full ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
