import { useState } from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // ✅ DYNAMIC AI QUALITY LOGIC
  const getAIQuality = (harvestDateStr) => {
    if (!harvestDateStr) return { label: "Standard", color: "text-gray-500", bg: "bg-gray-100" };
    
    const harvestDate = new Date(harvestDateStr);
    const today = new Date();
    const diffTime = Math.abs(today - harvestDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 2) return { label: "Elite Fresh", color: "text-green-700", bg: "bg-green-100" };
    if (diffDays <= 5) return { label: "Good", color: "text-blue-700", bg: "bg-blue-100" };
    return { label: "Average", color: "text-orange-700", bg: "bg-orange-100" };
  };

  const quality = getAIQuality(product.harvestDate);

  const finalPrice = product.discount > 0 
    ? (product.price - (product.price * product.discount) / 100).toFixed(2) 
    : product.price;

  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-xl transition-all p-4 flex flex-col h-full">
      {/* Image */}
      <div className="relative h-40 w-full mb-3">
        <img
          src={product.imageUrls?.[0] || "https://via.placeholder.com/300"}
          alt={product.name}
          className="h-full w-full object-cover rounded-xl"
        />
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${quality.bg} ${quality.color}`}>
          🌱 AI Quality: {quality.label}
        </div>
      </div>

      {/* Info */}
      <h2 className="text-lg font-bold dark:text-white leading-tight">{product.name}</h2>
      <p className="text-xs text-gray-500 mb-2">📍 {product.farmLocation || "Local Farm"}</p>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl font-black text-green-600">₹{finalPrice}</span>
        {product.discount > 0 && (
          <span className="text-xs line-through text-gray-400">₹{product.price}</span>
        )}
      </div>

      <div className="mt-auto space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase">
          <span>Stock: {product.quantity}kg</span>
          <span>Type: {product.type}</span>
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            max={product.quantity}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-16 border rounded-lg p-2 dark:bg-gray-700 dark:text-white text-sm"
          />
          <button
            onClick={() => addToCart(product, quantity)}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded-lg text-sm transition-all"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;