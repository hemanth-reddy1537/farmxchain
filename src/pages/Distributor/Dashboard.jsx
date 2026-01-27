import StatCard from "../../components/Distributor/StatCard";
import OrderTable from "../../components/Distributor/OrderTable";

const Dashboard = () => {
  const orders = [
    { id: "ORD001", product: "Tomato", qty: 50, status: "PLACED" },
    { id: "ORD002", product: "Onion", qty: 100, status: "SHIPPED" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Distributor Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Orders" value="124" icon="📦" color="#4f46e5" />
        <StatCard title="Pending Orders" value="7" icon="⏳" color="#f97316" />
        <StatCard title="Active Products" value="18" icon="🧺" color="#16a34a" />
        <StatCard title="Avg Quality" value="B+" icon="⭐" color="#9333ea" />
      </div>

      <div className="bg-yellow-100 text-yellow-800 p-4 rounded">
        🧠 <strong>Market Insight:</strong> Tomato & Onion demand is increasing
        this week.
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Recent Orders</h3>
        <OrderTable orders={orders} />
      </div>
    </div>
  );
};

export default Dashboard;
