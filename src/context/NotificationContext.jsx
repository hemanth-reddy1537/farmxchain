import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import API from "../api/api";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const fetchNotifications = useCallback(async () => {
    if (!token || role !== "customer") return;
    try {
      // Fetching recent orders to check for status updates
      const res = await API.get("/api/orders/customer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const orders = res.data || [];
      // Filter orders that were recently accepted or shipped to create "mock" notifications
      const newNotifications = orders
        .filter(o => o.status !== "PENDING")
        .map(o => ({
          id: o.id,
          message: `Your order for ${o.productName} is now ${o.status}!`,
          time: new Date(o.createdAt).toLocaleTimeString(),
          isRead: false
        })).slice(0, 5);

      setNotifications(newNotifications);
      setUnreadCount(newNotifications.length);
    } catch (err) {
      console.error("Notification fetch failed", err);
    }
  }, [token, role]);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const markAllAsRead = () => {
    setUnreadCount(0);
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);