const Statcard = ({ title, value, icon, color }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow p-6 flex items-center gap-4 border-l-4 ${color}`}
    >
      <div className="text-3xl">{icon}</div>

      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default Statcard;
