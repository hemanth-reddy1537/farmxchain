import { useEffect, useState, useCallback } from "react";
import CustomerLayout from "../../Layouts/CustomerLayout";
import API from "../../api/api";
import ProductCard from "../../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All"); // ✅ Added missing state
  const token = localStorage.getItem("token");

  const fetchProducts = useCallback(async () => {
    try {
      const res = await API.get("/api/products/customer", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data || []);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  }, [token]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ✅ Updated filtering logic to include both Search and Category
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterType === "All" || p.type?.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <CustomerLayout>
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">🛒 Fresh Marketplace</h1>
        
        <input
          type="text"
          placeholder="Search fresh crops..."
          className="w-full md:w-80 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 outline-none transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Filter Bar */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {["All", "Vegetables", "Fruits", "Grains", "Dairy"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterType(cat)}
            className={`px-6 py-2 rounded-full whitespace-nowrap font-bold text-sm transition-all border ${
              filterType === cat 
              ? "bg-green-600 text-white border-green-600 shadow-lg shadow-green-600/20" 
              : "bg-white dark:bg-gray-800 text-gray-500 border-gray-200 dark:border-gray-700 hover:border-green-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-500 font-medium">No products found matching your criteria.</p>
          <button 
            onClick={() => {setSearchTerm(""); setFilterType("All");}}
            className="mt-4 text-green-600 font-bold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </CustomerLayout>
  );
};

export default Products;