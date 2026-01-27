import React, { useEffect, useState, useCallback } from "react";
import CustomerLayout from "../../Layouts/CustomerLayout";
import API from "../../api/api";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchOrders = useCallback(async () => {
    try {
      const res = await API.get("/api/orders/customer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data || []);
    } catch (err) {
      console.error("Error fetching orders", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Helper to map backend status to timeline index
  const getStatusStep = (status) => {
    const steps = ["PENDING", "ACCEPTED", "PACKED", "SHIPPED", "DELIVERED"];
    return steps.indexOf(status?.toUpperCase() || "PENDING");
  };

  const handleCancel = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await API.put(`/api/orders/${orderId}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders(); // Refresh list
    } catch (err) {
      alert("Only PENDING orders can be cancelled.");
    }
  };

  return (
    <CustomerLayout>
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Track Your Harvests</h1>
          <p className="text-gray-500">View status and manage your recent purchases</p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20 animate-pulse text-green-600 font-bold">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-gray-500">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                
                {/* Order Header */}
                <div className="flex flex-col md:flex-row justify-between border-b dark:border-gray-700 pb-4 mb-6 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-xl">📦</div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white">{order.productName}</h3>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Order ID: #{order.id}</p>
                    </div>
                  </div>
                  <div className="md:text-right">
                    <p className="text-xl font-black text-green-600">₹{order.totalPrice}</p>
                    <p className="text-xs text-gray-400">Qty: {order.quantity} kg • {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Visual Timeline */}
                <div className="px-2 md:px-10 mb-8">
                  <div className="relative flex justify-between">
                    {/* Background Line */}
                    <div className="absolute top-2.5 left-0 w-full h-1 bg-gray-100 dark:bg-gray-700 -z-0"></div>
                    {/* Progress Line */}
                    <div 
                      className="absolute top-2.5 left-0 h-1 bg-green-500 transition-all duration-700 -z-0"
                      style={{ width: `${Math.max(0, (getStatusStep(order.status) / 4) * 100)}%` }}
                    ></div>

                    {["Ordered", "Accepted", "Packed", "Shipped", "Delivered"].map((label, idx) => {
                      const stepIndex = getStatusStep(order.status);
                      const isDone = idx <= stepIndex;
                      const isCurrent = idx === stepIndex;
                      
                      return (
                        <div key={label} className="flex flex-col items-center relative z-10">
                          <div className={`w-6 h-6 rounded-full border-4 flex items-center justify-center transition-colors ${
                            isDone ? "bg-green-500 border-white dark:border-gray-800" : "bg-gray-200 dark:bg-gray-700 border-white dark:border-gray-800"
                          }`}>
                            {isDone && <span className="text-[10px] text-white">✓</span>}
                          </div>
                          <span className={`text-[10px] mt-2 font-bold uppercase ${isCurrent ? "text-green-600" : "text-gray-400"}`}>
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">
                  {order.status === "PENDING" && (
                    <button 
                      onClick={() => handleCancel(order.id)}
                      className="px-5 py-2 text-sm font-bold text-red-500 border border-red-100 rounded-lg hover:bg-red-50 transition-all"
                    >
                      Cancel
                    </button>
                  )}
                  {["DELIVERED", "CANCELLED", "REJECTED"].includes(order.status) && (
                    <button className="px-5 py-2 text-sm font-bold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all">
                      Reorder
                    </button>
                  )}
                  <button className="px-5 py-2 text-sm font-bold text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700 transition-all">
                    Help Center
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CustomerLayout>
  );
};

export default MyOrder;