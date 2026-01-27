import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import CustomerLayout from "../../Layouts/CustomerLayout";
import API from "../../api/api";
import { Link } from "react-router-dom";
import OrderSuccessModal from "./OrderSuccessModal";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false); // ✅ Added loading state
  const [showSuccess, setShowSuccess] = useState(false); // ✅ Added modal state
  const token = localStorage.getItem("token");

  const totalAmount = getCartTotal();

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setIsProcessing(true); // ✅ Start loading

    try {
      const orderPromises = cartItems.map((item) =>
        API.post(
          "/api/orders/create",
          {
            productId: item.id,
            quantity: item.quantity,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      );

      await Promise.all(orderPromises);
      clearCart();
      setShowSuccess(true); // ✅ Show success modal instead of alert
    } catch (err) {
      console.error("Checkout failed", err);
      alert("Failed to place some orders. Please check your connection.");
    } finally {
      setIsProcessing(false); // ✅ Stop loading
    }
  };

  return (
    <CustomerLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
          Your Shopping Basket
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-dashed border-gray-300 dark:border-gray-700">
            <div className="text-6xl mb-4">🧺</div>
            <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">Looks like you haven't added any fresh produce yet.</p>
            <Link
              to="/customer/products"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition-all"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4"
                >
                  <img
                    src={item.imageUrls?.[0] || "https://via.placeholder.com/100"}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 dark:text-white">{item.name}</h3>
                    <p className="text-sm text-gray-500">Farm: {item.farmName || "Local"}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center border dark:border-gray-600 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-white"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-semibold dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.availableQuantity}
                          className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-white"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 text-sm font-medium hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      ₹{(item.discount > 0 
                          ? item.price - (item.price * item.discount) / 100 
                          : item.price) * item.quantity}
                    </p>
                    <p className="text-xs text-gray-400">₹{item.price}/kg</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-md border border-gray-100 dark:border-gray-700 h-fit sticky top-6">
              <h2 className="text-xl font-bold mb-4 dark:text-white">Order Summary</h2>
              <div className="space-y-3 pb-4 border-b dark:border-gray-700">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
              </div>
              <div className="flex justify-between items-center py-4">
                <span className="text-lg font-bold dark:text-white">Total</span>
                <span className="text-2xl font-black text-green-600">₹{totalAmount}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isProcessing} // ✅ Disable button during checkout
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </button>
              <p className="text-[10px] text-center text-gray-400 mt-4 uppercase tracking-widest">
                Secure Blockchain-Verified Transaction
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Add Modal Component */}
      <OrderSuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
      />
    </CustomerLayout>
  );
};

export default Cart;