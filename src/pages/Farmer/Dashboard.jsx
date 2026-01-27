import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Farmerlayout from "../../Layouts/Farmerlayout";
import Statcard from "../../components/Statcard";
import API from "../../api/api";
import SmartAdvisor from "./SmartAdvisor";
import { useCountUp } from "../../hooks/useCountUp";

const Dashboard = () => {
  const [farmer, setFarmer] = useState(null);
  const [stats, setStats] = useState({
    totalSales: 0,
    activeCrops: 0,
    ordersToday: 0,
    lowStock: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userRes = await API.get("/api/users/profile");
        setFarmer(userRes.data);

        const ordersRes = await API.get("/api/orders/farmer");
        const productsRes = await API.get("/api/products/my");

        const orders = ordersRes.data || [];
        const crops = productsRes.data || [];

        const today = new Date().toDateString();

        const totalSales = orders
          .filter(
            o => o.status !== "REJECTED" && o.status !== "CANCELLED"
          )
          .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

        const ordersToday = orders.filter(
          o => new Date(o.createdAt).toDateString() === today
        ).length;

        const lowStock = crops.filter(c => c.quantity < 10).length;

        setStats({
          totalSales,
          activeCrops: crops.length,
          ordersToday,
          lowStock,
        });
      } catch (err) {
        console.error("Dashboard sync error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // 🔢 Count-up animation (SAFE)
  const totalSales = useCountUp(loading ? 0 : stats.totalSales);
  const activeCrops = useCountUp(loading ? 0 : stats.activeCrops);
  const ordersToday = useCountUp(loading ? 0 : stats.ordersToday);
  const lowStock = useCountUp(loading ? 0 : stats.lowStock);

  return (
    <Farmerlayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Welcome, {farmer?.name || "Farmer"} 👨‍🌾
        </h1>
        <p className="text-gray-500 text-sm">
          Farmer ID: {farmer?.id || "—"} | Account:
          <span className="ml-1 text-green-600 font-bold uppercase text-[10px]">
            Active
          </span>
        </p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

        {/* Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Statcard
            title="Total Sales"
            value={loading ? "—" : `₹${totalSales.toLocaleString()}`}
            icon="💰"
            color="border-green-500"
            loading={loading}
          />

          <Statcard
            title="Active Crops"
            value={loading ? "—" : activeCrops}
            icon="🌾"
            color="border-emerald-500"
            loading={loading}
          />

          <Statcard
            title="Orders Today"
            value={loading ? "—" : ordersToday}
            icon="📦"
            color="border-blue-500"
            loading={loading}
          />

          <Statcard
            title="Low Stock Alert"
            value={loading ? "—" : lowStock}
            icon="⚠️"
            color="border-red-500"
            loading={loading}
          />
        </div>

        {/* AI Advisor */}
        <div className="lg:col-span-1">
          <SmartAdvisor />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/farmer/add-crop"
          className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:shadow-lg transition border-b-4 border-transparent hover:border-green-500"
        >
          <h3 className="text-lg font-semibold mb-2 dark:text-white">
            ➕ Add New Crop
          </h3>
          <p className="text-gray-500 text-sm">
            List new harvests with price and AI quality scores.
          </p>
        </Link>

        <Link
          to="/farmer/my-crops"
          className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:shadow-lg transition border-b-4 border-transparent hover:border-emerald-500"
        >
          <h3 className="text-lg font-semibold mb-2 dark:text-white">
            🌾 My Warehouse
          </h3>
          <p className="text-gray-500 text-sm">
            Manage your stock of {activeCrops} listed products.
          </p>
        </Link>

        <Link
          to="/farmer/orders"
          className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:shadow-lg transition border-b-4 border-transparent hover:border-blue-500"
        >
          <h3 className="text-lg font-semibold mb-2 dark:text-white">
            📦 Manage Orders
          </h3>
          <p className="text-gray-500 text-sm">
            View customer requests and delivery status.
          </p>
        </Link>
      </div>
    </Farmerlayout>
  );
};

export default Dashboard;
