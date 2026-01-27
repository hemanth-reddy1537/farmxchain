const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm border-l-4"
         style={{ borderColor: color }}>
      <div className="text-2xl">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
