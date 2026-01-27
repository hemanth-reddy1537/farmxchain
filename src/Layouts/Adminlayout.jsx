import { NavLink, Outlet } from "react-router-dom";
import AdminTopbar from "../components/Admin/AdminTopbar";

const AdminLayout = () => {
  const link = ({ isActive }) =>
    `block px-4 py-2 rounded transition ${
      isActive
        ? "bg-indigo-600 text-white"
        : "hover:bg-indigo-100 dark:hover:bg-gray-700"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg">
        <h2 className="text-xl font-black text-indigo-600 p-4">
          FarmX Admin
        </h2>

        <nav className="space-y-1 text-gray-700 dark:text-gray-200">
          <NavLink to="/admin/dashboard" className={link}>
            📊 Dashboard
          </NavLink>
          <NavLink to="/admin/users" className={link}>
            👥 Users
          </NavLink>
          <NavLink to="/admin/products" className={link}>
            🛒 Marketplace
          </NavLink>
          <NavLink to="/admin/orders" className={link}>
            📦 Orders
          </NavLink>
          <NavLink to="/admin/logs">📜 Audit Logs</NavLink>

        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <AdminTopbar />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
