const SearchOverlay = ({ open, onClose }) => {
  if (!open) return null;

  const results = [
    { type: "User", value: "Distributor #34" },
    { type: "Order", value: "ORD1003" },
    { type: "Product", value: "Onion" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-start justify-center pt-24">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-5">
        <input
          autoFocus
          placeholder="Search users, orders, products..."
          className="w-full border px-4 py-2 rounded-lg mb-4"
        />

        <div className="space-y-2">
          {results.map((r, i) => (
            <div
              key={i}
              className="p-3 border rounded hover:bg-indigo-50 cursor-pointer"
            >
              <span className="text-xs text-gray-500">{r.type}</span>
              <p className="font-semibold">{r.value}</p>
            </div>
          ))}
        </div>

        <button
          className="mt-4 text-sm text-gray-500 hover:text-black"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SearchOverlay;
