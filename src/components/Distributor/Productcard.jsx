const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col gap-2">
      <h3 className="font-semibold text-lg">{product.name}</h3>

      <p className="text-sm text-gray-600">
        ₹{product.price} / kg
      </p>

      <p className="text-sm">Available: {product.quantity} kg</p>

      <span
        className={`inline-block w-fit px-2 py-1 text-xs rounded-full
        ${product.quality === "A" && "bg-green-100 text-green-700"}
        ${product.quality === "B" && "bg-yellow-100 text-yellow-700"}
        ${product.quality === "C" && "bg-red-100 text-red-700"}`}
      >
        Quality {product.quality}
      </span>

      <button className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded">
        Place Order
      </button>
    </div>
  );
};

export default ProductCard;
