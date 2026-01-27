const AuditLogs = () => {
  const logs = [
    "Admin blocked Distributor #34",
    "Admin reviewed Order ORD1003",
    "Admin flagged Onion product",
    "Admin activated Farmer #12",
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black">System Audit Logs</h1>

      <div className="bg-white rounded-xl shadow divide-y">
        {logs.map((l, i) => (
          <div key={i} className="p-4 hover:bg-gray-50">
            {l}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditLogs;
