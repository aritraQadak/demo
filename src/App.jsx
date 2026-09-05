import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { SellerProvider } from './context/SellerContext';
import SellerLayout from './layouts/SellerLayout';

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
      <SellerProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SellerLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
              <Route path="earnings" element={<Earnings />} />
              <Route path="customers" element={<Customers />} />
              <Route path="verification" element={<Verification />} />
              <Route path="messages" element={<Messages />} />
              <Route path="settings" element={<Settings />} />

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
    </ThemeProvider>
  );
}
