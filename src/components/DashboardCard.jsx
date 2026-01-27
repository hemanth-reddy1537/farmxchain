export default function DashboardCard({ title, value, loading, icon, hint }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{icon}</span>
        <h4 className="text-sm font-medium text-gray-600">{title}</h4>
      </div>

      {loading ? (
        <div className="h-8 w-3/4 rounded-md bg-gray-200 animate-pulse" />
      ) : (
        <h2 className="text-3xl font-semibold text-gray-900">{value}</h2>
      )}

      {hint && (
        <p className="mt-2 text-xs text-gray-500">{hint}</p>
      )}
    </div>
  );
}
