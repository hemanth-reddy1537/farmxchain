import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/api";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem("token");

  useEffect(() => {
    API.get(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => alert("Product not found"));
  }, [id]);

  if (!product) {
    return <p className="p-6">Loading...</p>;
  }

  const totalPrice = quantity * product.price;

  const handleBuy = async () => {
    if (quantity <= 0 || quantity > product.quantity) {
      alert("Invalid quantity");
      return;
    }

    try {
      await API.post(
        "/api/orders/create",
        {
          productId: product.id,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order placed successfully!");
    } catch (err) {
      alert("Order failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>

        <p>Type: {product.type}</p>
        <p>Harvest Date: {product.harvestDate}</p>
        <p>Price: ₹{product.price} / kg</p>
        <p>Available: {product.quantity} kg</p>

        <input
          type="number"
          min="1"
          max={product.quantity}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border p-2 rounded w-full"
        />

        <p className="font-semibold">Total: ₹{totalPrice}</p>

        <button
          onClick={handleBuy}
          className="bg-green-600 text-white px-6 py-3 rounded w-full"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
