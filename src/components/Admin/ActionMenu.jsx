import { useState } from "react";

const ActionMenu = ({ onView, onBlock, onActivate }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}>⋮</button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow rounded w-32 text-sm">
          <button onClick={onView} className="block w-full px-3 py-2 hover:bg-gray-100">View</button>
          <button onClick={onBlock} className="block w-full px-3 py-2 text-red-600 hover:bg-gray-100">Block</button>
          <button onClick={onActivate} className="block w-full px-3 py-2 text-green-600 hover:bg-gray-100">Activate</button>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
