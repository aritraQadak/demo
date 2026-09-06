import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { SellerProvider } from './context/SellerContext';
import SellerLayout from './layouts/SellerLayout';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
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
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SellerProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Authentication Route */}
              <Route path="/login" element={<Login />} />
              <Route path="/auth" element={<Navigate to="/login" replace />} />

              {/* Protected Seller Application Routes (requires ARTISAN role) */}
              <Route
                path="/"
                element={
                  <ProtectedRoute requiredRole="ARTISAN">
                    <SellerLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="seller/dashboard" element={<Dashboard />} />
                <Route path="add-product" element={<AddProduct />} />
                <Route path="seller/add-product" element={<AddProduct />} />
                <Route path="products" element={<Products />} />
                <Route path="seller/products" element={<Products />} />
                <Route path="orders" element={<Orders />} />
                <Route path="seller/orders" element={<Orders />} />
                <Route path="earnings" element={<Earnings />} />
                <Route path="seller/earnings" element={<Earnings />} />
                <Route path="customers" element={<Customers />} />
                <Route path="seller/customers" element={<Customers />} />
                <Route path="verification" element={<Verification />} />
                <Route path="seller/verification" element={<Verification />} />
                <Route path="messages" element={<Messages />} />
                <Route path="seller/messages" element={<Messages />} />
                <Route path="settings" element={<Settings />} />
                <Route path="seller/settings" element={<Settings />} />

                {/* Seller Profile Route (and aliases) */}
                <Route path="seller/profile" element={<Profile />} />
                <Route path="profile" element={<Profile />} />

                {/* About Karigar Page (and aliases) */}
                <Route path="about" element={<About />} />
                <Route path="seller/about" element={<About />} />

                {/* Get in Touch / Contact Page (and aliases) */}
                <Route path="contact" element={<Contact />} />
                <Route path="seller/contact" element={<Contact />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SellerProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
