import React, { useEffect, useState } from "react";
import CustomerLayout from "../../Layouts/CustomerLayout";
import API from "../../api/api";
import { Link } from "react-router-dom";

const CustomerDashboard = () => {
  const [stats, setStats] = useState({ totalOrders: 0, pendingOrders: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
   // Inside your useEffect where you fetch orders
const fetchDashboardData = async () => {
  try {
    const res = await API.get("/api/orders/customer", {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    // ✅ Using fields from your OrderResponseDto
    const orders = res.data || [];
    const totalSpent = orders
      .filter(o => o.status === "DELIVERED")
      .reduce((acc, curr) => acc + curr.totalPrice, 0);

    setStats({
      totalOrders: orders.length,
      pendingOrders: orders.filter(o => o.status === "PENDING").length,
      savings: totalSpent * 0.1 // Mock savings calculation
    });
    
    setRecentOrders(orders.slice(0, 5));
  } catch (err) {
    console.error("Dashboard error", err);
  }
};
    fetchDashboardData();
  }, [token]);

  return (
    <CustomerLayout>
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Hello, Eco Buyer! 👋</h1>
          <p className="text-gray-500">Here's what's happening with your farm-to-table journey.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Orders" value={stats.totalOrders} icon="📦" color="bg-blue-500" />
          <StatCard title="Pending Pickup" value={stats.pendingOrders} icon="⏳" color="bg-yellow-500" />
          <StatCard title="Savings" value="₹1,250" icon="💰" color="bg-green-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders Table */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold dark:text-white">Recent Orders</h2>
              <Link to="/customer/orders" className="text-green-600 font-bold text-sm hover:underline">View All</Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-xs uppercase tracking-widest border-b dark:border-gray-700">
                    <th className="pb-3 px-2">Product</th>
                    <th className="pb-3 px-2">Date</th>
                    <th className="pb-3 px-2">Status</th>
                    <th className="pb-3 px-2 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-700">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="text-sm">
                      <td className="py-4 px-2 font-bold dark:text-white">{order.productName}</td>
                      <td className="py-4 px-2 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="py-4 px-2">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${
                          order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-right font-bold dark:text-white">₹{order.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Recommendation Placeholder */}
          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between">
            <div>
              <span className="bg-white/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">AI Suggestion</span>
              <h3 className="text-2xl font-bold mt-4">Fresh Organic Tomatoes</h3>
              <p className="text-green-100 text-sm mt-2">Harvested just 2 hours ago. High freshness score detected!</p>
            </div>
            <Link to="/customer/products" className="mt-8 bg-white text-green-700 text-center font-bold py-3 rounded-xl hover:bg-green-50 transition-all">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-5">
    <div className={`${color} h-12 w-12 rounded-2xl flex items-center justify-center text-xl text-white shadow-lg`}>
      {icon}
    </div>
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{title}</p>
      <p className="text-2xl font-black text-gray-800 dark:text-white">{value}</p>
    </div>
  </div>
);

export default CustomerDashboard;