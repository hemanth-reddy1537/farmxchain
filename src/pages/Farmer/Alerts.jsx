import { useEffect, useState } from "react";
import Farmerlayout from "../../Layouts/Farmerlayout";
import API from "../../api/api";
import { Link } from "react-router-dom";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await API.get("/api/products/my");
        const lowStock = res.data.filter(p => p.quantity < 10);
        setAlerts(lowStock);
      } catch (err) {
        console.error("Alert fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <Farmerlayout>
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        ⚠️ Inventory Alerts
      </h1>

      {loading ? (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl animate-pulse">
          Loading alerts...
        </div>
      ) : alerts.length === 0 ? (
        <div className="p-6 bg-green-50 dark:bg-gray-800 rounded-xl text-green-600">
          ✅ All crops have sufficient stock.
        </div>
      ) : (
        <div className="grid gap-4">
          {alerts.map(crop => (
            <div
              key={crop.id}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow flex justify-between items-center border-l-4 border-red-500"
            >
              <div>
                <h3 className="font-semibold text-lg dark:text-white">
                  {crop.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Remaining Stock: <span className="font-bold text-red-600">
                    {crop.quantity} kg
                  </span>
                </p>
              </div>

              <Link
                to={`/farmer/my-crops`}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Update Stock
              </Link>
            </div>
          ))}
        </div>
      )}
    </Farmerlayout>
  );
};

export default Alerts;
