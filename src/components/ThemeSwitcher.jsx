import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="border rounded p-2 dark:bg-gray-800 dark:text-white"
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
};

export default ThemeSwitcher;
