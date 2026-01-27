import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomerLayout from "../../Layouts/CustomerLayout";
import API from "../../api/api";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await API.get(`/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(res.data);
      } catch (err) {
        console.error("Error fetching order details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [id, token]);

  if (loading) return <CustomerLayout><p className="text-center py-10">Loading details...</p></CustomerLayout>;
  if (!order) return <CustomerLayout><p className="text-center py-10">Order not found.</p></CustomerLayout>;

  return (
    <CustomerLayout>
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 text-sm font-bold text-green-600 flex items-center gap-2 hover:underline"
      >
        ← Back to My Orders
      </button>

      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-8 border-b dark:border-gray-700 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-gray-800 dark:text-white">Order Receipt</h1>
            <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mt-1">ID: #{order.id}</p>
          </div>
          <div className="text-right">
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-xs font-black uppercase">
              {order.status}
            </span>
            <p className="text-xs text-gray-400 mt-2">{new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="p-8">
          <div className="flex gap-6 mb-8">
            <img 
              src={order.productImageUrl || "https://via.placeholder.com/150"} 
              alt={order.productName} 
              className="w-32 h-32 object-cover rounded-2xl shadow-sm"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold dark:text-white">{order.productName}</h2>
              <p className="text-gray-500">Ordered Quantity: <span className="font-bold">{order.quantity} kg</span></p>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Farmer Contact</p>
                <p className="text-sm font-semibold dark:text-white">{order.farmerName || "Assigned Farmer"}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t dark:border-gray-700">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Item Subtotal</span>
              <span>₹{order.totalPrice}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Shipping & Handling</span>
              <span className="text-green-600 font-bold">FREE</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t dark:border-gray-700">
              <span className="text-xl font-bold dark:text-white">Grand Total</span>
              <span className="text-3xl font-black text-green-600">₹{order.totalPrice}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 p-6 text-center">
          <p className="text-xs text-gray-400 italic">
            This order is tracked via FarmXChain Traceability Protocol. 🌿
          </p>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default OrderDetails;