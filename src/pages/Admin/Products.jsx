import { useEffect, useState } from "react";
import API from "../../api/api";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Products = () => {
  const [products, setProducts] = useState([]);

  // 🔹 Load products from backend
  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch(() => console.error("Failed to load products"));
  }, []);

  // 🔹 Flag logic (admin intelligence)
  const getFlag = (p) => {
    if (p.price > 100) return "PRICE";
    if (p.quantity < 100) return "STOCK";
    return "NORMAL";
  };

  // 🔹 Hide product (frontend-only moderation)
  const hideProduct = (id) => {
    const confirmHide = window.confirm(
      "Are you sure you want to hide this product?"
    );
    if (!confirmHide) return;

    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // 🔹 Chart data (dynamic)
  const chartData = [
    {
      name: "High Price",
      value: products.filter((p) => p.price > 100).length,
    },
    {
      name: "Low Stock",
      value: products.filter((p) => p.quantity < 100).length,
    },
    {
      name: "Normal",
      value: products.filter(
        (p) => p.price <= 100 && p.quantity >= 100
      ).length,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold">
          Marketplace Intelligence
        </h1>
        <p className="text-gray-500">
          Product pricing, availability & seller behaviour
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <KpiCard
          title="Total Products"
          value={products.length}
        />
        <KpiCard
          title="Risky Listings"
          value={products.filter((p) => getFlag(p) !== "NORMAL").length}
          color="from-orange-500 to-red-500"
        />
        <KpiCard
          title="Active Sellers"
          value="—"
          color="from-emerald-500 to-green-600"
        />
      </div>

      {/* Charts */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-bold mb-4">
          Marketplace Risk Overview
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4">Seller</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => {
              const flag = getFlag(p);

              return (
                <tr
                  key={p.id}
                  className="border-b hover:bg-indigo-50 transition"
                >
                  <td className="p-4 font-semibold">
                    {p.name}
                  </td>

                  <td className="p-4 text-center">
                    Farmer #{p.farmerId}
                  </td>

                  <td className="p-4 font-semibold">
                    ₹{p.price}
                    {flag === "PRICE" && (
                      <Badge color="red" label="High" />
                    )}
                  </td>

                  <td className="p-4">
                    {p.quantity}
                    {flag === "STOCK" && (
                      <Badge color="orange" label="Low" />
                    )}
                  </td>

                  <td className="p-4">
                    {flag !== "NORMAL" && (
                      <Badge color="gray" label={flag} />
                    )}
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => hideProduct(p.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Hide
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No products available
          </div>
        )}
      </div>
    </div>
  );
};

/* 🔹 KPI Card */
const KpiCard = ({
  title,
  value,
  color = "from-indigo-600 to-indigo-500",
}) => (
  <div
    className={`bg-gradient-to-r ${color} text-white p-6 rounded-xl shadow-lg`}
  >
    <p className="opacity-80">{title}</p>
    <p className="text-4xl font-extrabold">{value}</p>
  </div>
);

/* 🔹 Badge */
const Badge = ({ color, label }) => {
  const map = {
    red: "bg-red-100 text-red-700",
    orange: "bg-orange-100 text-orange-700",
    gray: "bg-gray-200 text-gray-700",
  };

  return (
    <span
      className={`ml-2 text-xs px-2 py-1 rounded-full ${map[color]}`}
    >
      {label}
    </span>
  );
};

export default Products;
