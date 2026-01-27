import Farmerlayout from "../../Layouts/Farmerlayout";
import Statcard from "../../components/Statcard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const salesData = [
  { day: "Mon", sales: 400 },
  { day: "Tue", sales: 700 },
  { day: "Wed", sales: 500 },
  { day: "Thu", sales: 900 },
  { day: "Fri", sales: 1200 },
];

const cropProfitData = [
  { crop: "Tomato", profit: 3000 },
  { crop: "Potato", profit: 2000 },
  { crop: "Onion", profit: 4000 },
];

const buyerSplitData = [
  { name: "Customers", value: 65 },
  { name: "Distributors", value: 35 },
];

const COLORS = ["#16a34a", "#2563eb"];

const Analytics = () => {
  return (
    <Farmerlayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        📊 Analytics
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Statcard title="Total Sales" value="₹78,000" icon="💰" color="border-green-500" />
        <Statcard title="Total Profit" value="₹26,500" icon="📈" color="border-emerald-500" />
        <Statcard title="Orders" value="42" icon="📦" color="border-blue-500" />
        <Statcard title="Top Crop" value="Onion" icon="🌾" color="border-yellow-500" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Trend */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold mb-4">Sales Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#16a34a"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Crop Profit */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold mb-4">Crop-wise Profit</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cropProfitData}>
              <XAxis dataKey="crop" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="profit" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Buyer Split */}
        <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
          <h2 className="font-semibold mb-4">Sales Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={buyerSplitData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {buyerSplitData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Farmerlayout>
  );
};

export default Analytics;
