import { useEffect, useState, useCallback } from "react";
import Farmerlayout from "../../Layouts/Farmerlayout";
import StatusBadge from "../../components/StatusBadge";
import API from "../../api/api";
import { toast } from "react-hot-toast";



const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchOrders = useCallback(async () => {
    try {
      const res = await API.get("/api/orders/farmer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // ✅ Using your logic: Force state update with fresh data
      setOrders([...res.data]);
    } catch (err) {
      console.error("Error fetching orders", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

 const updateStatus = async (orderId, status) => {
  try {
    await API.put(`/api/orders/${orderId}/status`, { status });
    toast.success(`Order marked as ${status}`);
    fetchOrders(); // reload list
  } catch (err) {
    toast.error(err.response?.data || "Action failed");
  }
};


  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <Farmerlayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">📦 Orders Received</h1>
        <button 
          onClick={fetchOrders} 
          className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded-lg hover:bg-gray-200 dark:text-white"
        >
          🔄 Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Syncing with server...</p>
      ) : orders.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl text-center border border-dashed border-gray-300">
          <p className="text-gray-500">No orders yet. Your products are live in the marketplace!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.orderId} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border dark:border-gray-700">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Product & Order Info */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      Order #{order.orderId}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-black dark:text-white">{order.productName}</h3>
                  <div className="mt-2 space-y-1 text-sm">
                    <p className="dark:text-gray-300">Quantity: <span className="font-bold">{order.quantity} kg</span></p>
                    <p className="text-green-600 font-black text-lg">₹{order.totalPrice}</p>
                  </div>
                </div>

                {/* Customer Info & Actions */}
                <div className="flex flex-col justify-between">
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl border dark:border-gray-700">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Customer</p>
                    <p className="text-sm font-bold dark:text-white">{order.customerEmail}</p>
                    <p className="text-xs text-gray-500">Status: <span className="text-blue-600 font-bold uppercase">{order.status}</span></p>
                  </div>

                  <div>
    <p className="font-semibold">{order.productName}</p>
    <StatusBadge status={order.status} />
  </div>

  <div className="flex gap-2">
    {order.status === "PENDING" && (
      <button
        onClick={() => updateStatus(order.id, "ACCEPTED")}
        className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        Accept
      </button>
    )}

    {order.status === "ACCEPTED" && (
      <button
        onClick={() => updateStatus(order.id, "DELIVERED")}
        className="px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700"
      >
        Deliver
      </button>
    )}

    {(order.status === "DELIVERED" ||
      order.status === "CANCELLED") && (
      <span className="text-xs text-gray-500 italic">
        Action closed
      </span>
    )}
  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Farmerlayout>
  );
};

export default Orders;