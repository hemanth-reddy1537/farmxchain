import ProductCard from "../../components/Distributor/Productcard";

const Marketplace = () => {
  const products = [
    { id: 1, name: "Tomato", price: 20, quantity: 500, quality: "A" },
    { id: 2, name: "Onion", price: 18, quantity: 800, quality: "B" },
    { id: 3, name: "Potato", price: 15, quantity: 1000, quality: "A" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Marketplace</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-3">
          <h4 className="font-semibold">Filters</h4>

          <select className="w-full border rounded p-2">
            <option>All Categories</option>
            <option>Vegetables</option>
            <option>Fruits</option>
          </select>

          <select className="w-full border rounded p-2">
            <option>All Quality</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </div>

        {/* Products */}
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
