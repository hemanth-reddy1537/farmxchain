import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchOverlay from "./SearchOverlay";
import NotificationPanel from "./NotificationPanel";

const AdminTopbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b shadow">
        <div className="flex items-center justify-between px-6 h-16">
          {/* Left */}
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-extrabold text-indigo-600">
              FarmX Admin
            </h1>

            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:block px-4 py-2 border rounded-lg text-gray-500 hover:bg-gray-100"
            >
              Search…
            </button>
          </div>

          {/* Right */}
          <div className="flex items-center gap-5 relative">
            {/* Notifications */}
            <button onClick={() => setNotifOpen(!notifOpen)} className="relative">
              🔔
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">
                3
              </span>
            </button>

            {notifOpen && <NotificationPanel open onClose={() => setNotifOpen(false)} />}

            {/* Theme */}
            <button onClick={toggleTheme} className="text-xl">
              {dark ? "🌙" : "☀️"}
            </button>

            {/* Profile */}
            <button onClick={() => setProfileOpen(!profileOpen)}>
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=4f46e5&color=fff"
                className="w-8 h-8 rounded-full"
                alt="admin"
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-14 bg-white shadow rounded w-40">
                <button
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => navigate("/admin/dashboard")}
                >
                  Dashboard
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default AdminTopbar;
