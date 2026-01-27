import { useState } from "react";
import ThemeSwitcher from "./Distributor/ThemeSwitcher";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Distributor Dashboard
      </h1>

      <div className="flex items-center gap-4 relative">
        <ThemeSwitcher />

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2"
          >
            <img
              src="https://ui-avatars.com/api/?name=Distributor"
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm dark:text-gray-200">Distributor</span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 shadow rounded-lg overflow-hidden">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => navigate("/distributor/profile")}
              >
                Profile
              </button>

              <button
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
