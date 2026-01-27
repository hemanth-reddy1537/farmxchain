const STATUS_FLOW = [
  "PENDING",
  "ACCEPTED",
  "PACKED",
  "SHIPPED",
  "DELIVERED",
];

const OrderTimeline = ({ status }) => {
  const currentIndex = STATUS_FLOW.indexOf(status);

  // If rejected or cancelled
  if (["REJECTED", "CANCELLED"].includes(status)) {
    return (
      <p className="text-red-600 font-semibold mt-3">
        ❌ Order {status}
      </p>
    );
  }

  return (
    <div className="flex items-center gap-4 mt-4">
      {STATUS_FLOW.map((step, index) => {
        const isCompleted = index <= currentIndex;

        return (
          <div key={step} className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                ${isCompleted ? "bg-green-600 text-white" : "bg-gray-300 text-gray-600"}
              `}
            >
              {index + 1}
            </div>

            <span
              className={`text-sm ${
                isCompleted ? "text-green-700 font-semibold" : "text-gray-500"
              }`}
            >
              {step}
            </span>

            {index < STATUS_FLOW.length - 1 && (
              <div className="w-8 h-[2px] bg-gray-300" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrderTimeline;
