export default function SupplierCard({ supplier }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">{supplier.name}</h3>
      <p>Avg Grade: {supplier.grade}</p>
      <p>Total Orders: {supplier.orders}</p>

      <button className="mt-2 text-green-600 underline">
        View Products
      </button>
    </div>
  );
}
