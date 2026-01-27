import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Load initial cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("farmx_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("farmx_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      
      // Calculate max allowed based on product stock
      const currentInCart = exists ? exists.quantity : 0;
      const newQuantity = Math.min(currentInCart + quantity, product.quantity);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      return [...prev, { ...product, quantity: newQuantity }];
    });
  };

  const updateQuantity = (id, newQty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQty) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const getCartTotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = item.discount > 0 
        ? item.price - (item.price * item.discount) / 100 
        : item.price;
      return acc + price * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        getCartTotal 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;