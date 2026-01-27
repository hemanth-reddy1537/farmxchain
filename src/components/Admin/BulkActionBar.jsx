const BulkActionBar = ({ count, onBlock, onActivate, onDismiss }) => {
  if (count === 0) return null;

  return (
    <div className="bg-gray-800 text-white p-3 rounded flex gap-4 items-center">
      <span>{count} selected</span>
      <button onClick={onBlock} className="text-red-400">Block</button>
      <button onClick={onActivate} className="text-green-400">Activate</button>
      <button onClick={onDismiss} className="text-gray-300">Dismiss</button>
    </div>
  );
};

export default BulkActionBar;
