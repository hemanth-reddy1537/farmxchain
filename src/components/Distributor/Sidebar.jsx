import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const base =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition";

  const active =
    "bg-indigo-600 text-white";

  const inactive =
    "text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-gray-700";

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-4">
      <h2 className="text-xl font-bold text-indigo-600 mb-6">
        FarmX Distributor
      </h2>

      <nav className="space-y-2">
        <NavLink
          to="/distributor/dashboard"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/distributor/marketplace"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          🛒 Marketplace
        </NavLink>

        <NavLink
          to="/distributor/orders"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          📦 Orders
        </NavLink>

        <NavLink
          to="/distributor/suppliers"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          🚜 Suppliers
        </NavLink>

        <NavLink
          to="/distributor/insights"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          📈 Insights
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
