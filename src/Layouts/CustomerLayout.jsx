import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNotifications } from "../context/NotificationContext"; // ✅ New Import
import ThemeSwitcher from "../components/ThemeSwitcher";

const CustomerLayout = ({ children }) => {
  const { cartItems } = useCart();
  const { notifications, unreadCount, markAllAsRead } = useNotifications(); // ✅ Use Hook
  const [showNotifs, setShowNotifs] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Sidebar - Same as before */}
      <aside className="w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col">
        {/* ... Logo and NavItems ... */}
        <nav className="flex-1 px-4 space-y-2 pt-8">
          <NavItem to="/customer/dashboard" icon="📊" label="Dashboard" />
          <NavItem to="/customer/products" icon="🛒" label="Browse Products" />
          <NavItem to="/customer/cart" icon="🧺" label="My Cart" count={cartItems.length} />
          <NavItem to="/customer/orders" icon="📦" label="Track Orders" />
          <NavItem to="/customer/profile" icon="👤" label="My Profile" />
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-8 flex justify-between items-center sticky top-0 z-40">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Customer Portal</h1>

          <div className="flex gap-6 items-center">
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => { setShowNotifs(!showNotifs); markAllAsRead(); }}
                className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full relative"
              >
                <span className="text-xl">🔔</span>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown */}
              {showNotifs && (
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl border dark:border-gray-700 overflow-hidden z-50">
                  <div className="p-4 border-b dark:border-gray-700 font-bold dark:text-white">Notifications</div>
                  <div className="max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-sm text-gray-500 text-center">No new updates</p>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className="p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all cursor-pointer">
                          <p className="text-sm dark:text-gray-200">{n.message}</p>
                          <span className="text-[10px] text-gray-400 font-bold uppercase">{n.time}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <ThemeSwitcher />
            <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">EB</div>
          </div>
        </header>

        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
};

// ... NavItem component ...


// Helper component for Nav Links
const NavItem = ({ to, icon, label, count }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center justify-between p-4 rounded-2xl transition-all duration-200 group ${
        isActive
          ? "bg-green-600 text-white shadow-lg shadow-green-600/30"
          : "text-gray-500 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-gray-800 hover:text-green-600"
      }`
    }
  >
    <div className="flex items-center gap-4">
      <span className="text-xl">{icon}</span>
      <span className="font-bold tracking-wide">{label}</span>
    </div>
    {count > 0 && (
      <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full animate-pulse">
        {count}
      </span>
    )}
  </NavLink>
);

export default CustomerLayout;