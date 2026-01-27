const StatusBadge = ({ value }) => {
  const styles = {
    PLACED: "bg-gray-200 text-gray-800",
    DELIVERED: "bg-green-500 text-white shadow-green-300 shadow-md",
    CANCELLED: "bg-red-500 text-white shadow-red-300 shadow-md",
  };

  return (
    <span className={`px-4 py-1 rounded-full text-xs font-bold ${styles[value]}`}>
      {value}
    </span>
  );
};

export default StatusBadge;
