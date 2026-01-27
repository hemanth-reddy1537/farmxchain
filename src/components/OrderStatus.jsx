const OrderStatus = ({ status }) => {
  const steps = ["Ordered", "Packed", "Shipped", "Delivered"];

  return (
    <div className="flex items-center gap-3 text-sm">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              steps.indexOf(status) >= index
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
          />
          <span
            className={
              steps.indexOf(status) >= index
                ? "text-green-700"
                : "text-gray-400"
            }
          >
            {step}
          </span>
        </div>
      ))}
    </div>
  );
};

export default OrderStatus;
