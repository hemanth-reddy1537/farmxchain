const NotificationPanel = ({ open, onClose }) => {
  if (!open) return null;

  const notifications = [
    "High value order placed (ORD1003)",
    "Distributor #21 inactive for 20 days",
    "Product Onion flagged for high price",
  ];

  return (
    <div className="absolute right-0 top-14 w-80 bg-white shadow-xl rounded-xl z-40">
      <div className="p-4 border-b font-bold">Notifications</div>

      <div className="max-h-64 overflow-y-auto">
        {notifications.map((n, i) => (
          <div
            key={i}
            className="p-3 border-b hover:bg-gray-100 text-sm"
          >
            {n}
          </div>
        ))}
      </div>

      <button
        className="w-full text-center py-2 text-sm text-indigo-600 hover:bg-gray-100"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default NotificationPanel;
