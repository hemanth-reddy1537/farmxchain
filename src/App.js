import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Home from "./Home";
import ForgotPassword from "./pages/ForgotPassword";

/* ================= FARMER ================= */
import FarmerDashboard from "./pages/Farmer/Dashboard";
import Addcrop from "./pages/Farmer/Addcrop";
import Mycrops from "./pages/Farmer/Mycrops";
import FarmerOrders from "./pages/Farmer/Orders";
import Analytics from "./pages/Farmer/Analytics";
import Alerts from "./pages/Farmer/Alerts";
import AIAdvisor from "./pages/Farmer/AIAdvisor";

/* ================= CUSTOMER ================= */
import CustomerDashboard from "./pages/Customer/Dashboard";
import Products from "./pages/Customer/Products";
import Cart from "./pages/Customer/Cart";
import MyOrders from "./pages/Customer/MyOrders";
import OrderDetails from "./pages/Customer/OrderDetails";
import Profile from "./pages/Profile"; // ✅ SHARED PROFILE

/* ================= DISTRIBUTOR ================= */
import DistributorLayout from "./Layouts/Distributorlayout";
import DistributorDashboard from "./pages/Distributor/Dashboard";
import Marketplace from "./pages/Distributor/Marketplace";
import DistributorOrders from "./pages/Distributor/Orders";
import DistributorSuppliers from "./pages/Distributor/Suppliers";
import DistributorInsights from "./pages/Distributor/Insights";

/* ================= ADMIN ================= */
import AdminLayout from "./Layouts/Adminlayout";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminUsers from "./pages/Admin/Users";
import AdminProducts from "./pages/Admin/Products";
import AdminOrders from "./pages/Admin/Orders";
import UserDetails from "./pages/Admin/UserDetails";
import AuditLogs from "./pages/Admin/AuditLogs";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ================= FARMER ================= */}
          <Route path="/farmer/dashboard" element={<ProtectedRoute role="farmer"><FarmerDashboard /></ProtectedRoute>} />
          <Route path="/farmer/add-crop" element={<ProtectedRoute role="farmer"><Addcrop /></ProtectedRoute>} />
          <Route path="/farmer/my-crops" element={<ProtectedRoute role="farmer"><Mycrops /></ProtectedRoute>} />
          <Route path="/farmer/orders" element={<ProtectedRoute role="farmer"><FarmerOrders /></ProtectedRoute>} />
          <Route path="/farmer/analytics" element={<ProtectedRoute role="farmer"><Analytics /></ProtectedRoute>} />
          <Route path="/farmer/alerts" element={<ProtectedRoute role="farmer"><Alerts /></ProtectedRoute>} />
          <Route path="/farmer/ai-advisor" element={<ProtectedRoute role="farmer"><AIAdvisor /></ProtectedRoute>} />

          {/* ================= CUSTOMER ================= */}
          <Route path="/customer/dashboard" element={<ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>} />
          <Route path="/customer/products" element={<ProtectedRoute role="customer"><Products /></ProtectedRoute>} />
          <Route path="/customer/cart" element={<ProtectedRoute role="customer"><Cart /></ProtectedRoute>} />
          <Route path="/customer/orders" element={<ProtectedRoute role="customer"><MyOrders /></ProtectedRoute>} />
          <Route path="/customer/orders/:id" element={<ProtectedRoute role="customer"><OrderDetails /></ProtectedRoute>} />

          {/* ================= DISTRIBUTOR ================= */}
          <Route
            path="/distributor"
            element={
              <ProtectedRoute role="distributor">
                <DistributorLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DistributorDashboard />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="orders" element={<DistributorOrders />} />
            <Route path="suppliers" element={<DistributorSuppliers />} />
            <Route path="insights" element={<DistributorInsights />} />
          </Route>

          {/* ================= ADMIN ================= */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="users/:uniqueId" element={<UserDetails />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="logs" element={<AuditLogs />} />
          </Route>

          {/* ================= PROFILE (ALL ROLES) ================= */}
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
