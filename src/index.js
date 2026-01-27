import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ThemeProvider from './context/ThemeContext';
import CartProvider from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <CartProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
);
reportWebVitals();