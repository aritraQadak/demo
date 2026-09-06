import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { SellerProvider } from './context/SellerContext';
import { BuyerProvider } from './context/BuyerContext';
import SellerLayout from './layouts/SellerLayout';
import BuyerLayout from './layouts/BuyerLayout';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';

// Seller Pages
import Dashboard from './pages/seller/Dashboard';
import AddProduct from './pages/seller/AddProduct';
import Products from './pages/seller/Products';
import Orders from './pages/seller/Orders';
import Earnings from './pages/seller/Earnings';
import Customers from './pages/seller/Customers';
import Verification from './pages/seller/Verification';
import Messages from './pages/seller/Messages';
import Settings from './pages/seller/Settings';
import Profile from './pages/seller/Profile';

// Buyer Pages
import Home from './pages/buyer/Home';
import StateExplore from './pages/buyer/StateExplore';
import ProductDetail from './pages/buyer/ProductDetail';
import Cart from './pages/buyer/Cart';
import Checkout from './pages/buyer/Checkout';
import BuyerOrders from './pages/buyer/Orders';
import Certificates from './pages/buyer/Certificates';
import Saved from './pages/buyer/Saved';
import Wallet from './pages/buyer/Wallet';

// Shared Pages
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BuyerProvider>
          <SellerProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Authentication Route */}
                <Route path="/login" element={<Login />} />
                <Route path="/auth" element={<Navigate to="/login" replace />} />

                {/* Protected Buyer / Patron Application Routes (requires PATRON role) */}
                <Route
                  element={
                    <ProtectedRoute allowedRoles={['PATRON']}>
                      <BuyerLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/" element={<Home />} />
                  <Route path="/explore/:stateSlug" element={<StateExplore />} />
                  <Route path="/product/:productId" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/buyer/orders" element={<BuyerOrders />} />
                  <Route path="/buyer/certificates" element={<Certificates />} />
                  <Route path="/buyer/saved" element={<Saved />} />
                  <Route path="/buyer/wallet" element={<Wallet />} />

                  {/* Shared Info Pages */}
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Route>

                {/* Protected Seller Application Routes (requires ARTISAN role) */}
                <Route
                  path="/seller"
                  element={
                    <ProtectedRoute requiredRole="ARTISAN">
                      <SellerLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="add-product" element={<AddProduct />} />
                  <Route path="products" element={<Products />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="earnings" element={<Earnings />} />
                  <Route path="customers" element={<Customers />} />
                  <Route path="verification" element={<Verification />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                </Route>

                {/* Legacy seller direct route aliases for backwards compatibility */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute requiredRole="ARTISAN">
                      <SellerLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </SellerProvider>
        </BuyerProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

