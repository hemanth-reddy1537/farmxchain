import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/farmer/dashboard", icon: "🏠" },
  { name: "Add Crop", path: "/farmer/add-crop", icon: "➕" },
  { name: "My Crops", path: "/farmer/my-crops", icon: "🌾" },
  { name: "Orders", path: "/farmer/orders", icon: "📦" },
  { name: "AI Advisor", path: "/farmer/ai-advisor", icon: "🤖" },
  { name: "Analytics", path: "/farmer/analytics", icon: "📊" },
  { name: "Alerts", path: "/farmer/alerts", icon: "🚨" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-green-700 text-white flex flex-col">
      <div className="p-6 text-xl font-bold">🌾 FarmChainX</div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive ? "bg-green-900" : "hover:bg-green-800"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
