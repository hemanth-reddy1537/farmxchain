import React, { useEffect, useState } from "react";
import DistributorLayout from "../../Layouts/DistributorLayout";
import API from "../../api/api";

const getGradeColor = (grade) => {
  if (grade === "A") return "bg-green-100 text-green-700";
  if (grade === "B") return "bg-yellow-100 text-yellow-700";
  if (grade === "C") return "bg-red-100 text-red-700";
  return "bg-gray-100 text-gray-600";
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products/wholesale");
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const openConfirm = (product) => {
    const qty = quantities[product.id];
    if (!qty || qty < 50) {
      alert("Minimum order is 50kg");
      return;
    }
    setSelected({ ...product, buyQty: qty });
  };

  const placeOrder = async () => {
    try {
      await API.post("/orders/place", {
        productId: selected.id,
        quantity: selected.buyQty,
      });
      alert("✅ Bulk order placed successfully");
      setSelected(null);
    } catch (err) {
      alert("❌ Order failed");
    }
  };

  return (
    <DistributorLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black">📦 Wholesale Products</h1>
        <span className="text-sm text-gray-500">
          Minimum order: <b>50kg</b>
        </span>
      </div>

      {loading && <p>Loading wholesale products...</p>}

      {!loading && products.length === 0 && (
        <p className="text-gray-500">No wholesale products available</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition p-4"
          >
            {/* Image placeholder */}
            <div className="h-40 bg-gray-100 rounded-xl mb-3 flex items-center justify-center text-gray-400">
              Crop Image
            </div>

            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg">{p.name}</h3>
              <span
                className={`text-xs px-2 py-1 rounded font-bold ${getGradeColor(
                  p.qualityGrade
                )}`}
              >
                AI Grade {p.qualityGrade || "N/A"}
              </span>
            </div>

            <p className="text-sm text-gray-500 mt-1">
              Farmer: <b>Farmer #{p.farmerId}</b>
            </p>

            <p className="text-green-600 font-bold mt-3 text-lg">
              ₹{p.price}/kg
            </p>

            <p className="text-sm text-gray-600">
              Available: {p.quantity} kg
            </p>

            <input
              type="number"
              min="50"
              placeholder="Enter quantity (kg)"
              className="w-full border rounded-lg px-3 py-2 mt-3"
              onChange={(e) =>
                setQuantities({
                  ...quantities,
                  [p.id]: Number(e.target.value),
                })
              }
            />

            <button
              onClick={() => openConfirm(p)}
              className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Buy Bulk
            </button>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">
              Confirm Bulk Purchase
            </h2>

            <div className="space-y-2 text-sm">
              <p><b>Product:</b> {selected.name}</p>
              <p><b>AI Grade:</b> {selected.qualityGrade}</p>
              <p><b>Quantity:</b> {selected.buyQty} kg</p>
              <p><b>Price:</b> ₹{selected.price}/kg</p>
            </div>

            <p className="font-bold text-lg mt-4">
              Total: ₹{selected.buyQty * selected.price}
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelected(null)}
                className="flex-1 border py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={placeOrder}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </DistributorLayout>
  );
};

export default Products;
