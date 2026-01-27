import { useState } from "react";
import StatusBadge from "../../components/Admin/StatusBadge";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    { id: "ORD1001", buyer: "Distributor #34", status: "PLACED", total: 2400, age: "2 hrs" },
    { id: "ORD1002", buyer: "Distributor #12", status: "DELIVERED", total: 8200, age: "2 days" },
    { id: "ORD1003", buyer: "Distributor #21", status: "PLACED", total: 12000, age: "1 day" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-extrabold">Orders Intelligence</h1>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-4">Order</th>
              <th className="p-4">Buyer</th>
              <th className="p-4">Status</th>
              <th className="p-4">Total</th>
              <th className="p-4">Age</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr
                key={o.id}
                onClick={() => setSelectedOrder(o)}
                className="border-b hover:bg-indigo-50 cursor-pointer transition"
              >
                <td className="p-4 font-semibold">{o.id}</td>
                <td className="p-4">{o.buyer}</td>
                <td className="p-4"><StatusBadge value={o.status} /></td>
                <td className="p-4 font-semibold">
                  ₹{o.total}
                  {o.total > 5000 && (
                    <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                      High
                    </span>
                  )}
                </td>
                <td className="p-4">{o.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Slide Over */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
          <div className="w-96 bg-white h-full p-6 shadow-xl animate-slide-in">
            <button
              className="mb-4 text-gray-500 hover:text-black"
              onClick={() => setSelectedOrder(null)}
            >
              ✕ Close
            </button>

            <h2 className="text-xl font-black mb-4">
              Order {selectedOrder.id}
            </h2>

            <p><strong>Buyer:</strong> {selectedOrder.buyer}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Total:</strong> ₹{selectedOrder.total}</p>
            <p><strong>Age:</strong> {selectedOrder.age}</p>

            <div className="mt-6 space-y-2">
              <button className="w-full bg-indigo-600 text-white py-2 rounded">
                Review Order
              </button>
              <button className="w-full bg-red-600 text-white py-2 rounded">
                Flag Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
