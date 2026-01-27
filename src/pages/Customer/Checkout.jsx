import { useCart } from "../../context/CartContext";
import CustomerLayout from "../../Layouts/CustomerLayout";
import API from "../../api/api";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const token = localStorage.getItem("token");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      for (const item of cart) {
        await API.post(
          "/api/orders/create",
          {
            productId: item.id,
            quantity: item.quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      clearCart();
      alert("✅ Order placed successfully!");
      window.location.href = "/customer/orders";
    } catch (err) {
      alert("❌ Checkout failed");
    }
  };

  return (
    <CustomerLayout>
      <h1 className="text-2xl font-bold mb-6">💳 Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow flex justify-between"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} × ₹{item.price}
                  </p>
                </div>
                <p className="font-semibold">
                  ₹{item.quantity * item.price}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">Total: ₹{total}</h2>

            <button
              onClick={placeOrder}
              className="bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </CustomerLayout>
  );
};

export default Checkout;
