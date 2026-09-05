import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialSellerProfile,
  initialOrders,
  initialProducts,
  initialTransactions,
  initialCustomers,
  initialMessages
} from '../data/sellerData';
import i18n from '../i18n/i18n';

const SellerContext = createContext();

export const SellerProvider = ({ children }) => {
  // Language (synced with i18n and localStorage 'karigar-language')
  const [lang, setLangState] = useState(() => localStorage.getItem('karigar-language') || i18n.language || 'en');

  const setLang = (newLang) => {
    setLangState(newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem('karigar-language', newLang);
  };

  useEffect(() => {
    const handleLangChanged = (newLang) => {
      setLangState(newLang);
    };
    i18n.on('languageChanged', handleLangChanged);
    return () => {
      i18n.off('languageChanged', handleLangChanged);
    };
  }, []);

  // Seller Profile
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('karigar_profile');
    return saved ? JSON.parse(saved) : initialSellerProfile;
  });

  // Products
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('karigar_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  // Orders
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('karigar_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  // Transactions
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('karigar_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  // Customers
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('karigar_customers');
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  // Messages
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('karigar_messages');
    return saved ? JSON.parse(saved) : initialMessages;
  });

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Selected Order for Modal / Drawer
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('karigar-language', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('karigar_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('karigar_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('karigar_orders', JSON.stringify(orders));
  }, [orders]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addProduct = (newProduct) => {
    const created = {
      ...newProduct,
      id: Date.now(),
      status: 'Live',
      views: 12,
      orders: 0,
      authenticityScore: newProduct.authenticityScore || 92
    };
    setProducts((prev) => [created, ...prev]);
    setProfile((prev) => ({
      ...prev,
      totalProducts: prev.totalProducts + 1
    }));
    addToast('Product published successfully to Karigar global catalog!', 'success');
  };

  const updateProduct = (id, updated) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    addToast('Product updated successfully', 'success');
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setProfile((prev) => ({
      ...prev,
      totalProducts: Math.max(0, prev.totalProducts - 1)
    }));
    addToast('Product removed from catalog', 'info');
  };

  const updateProfile = (updated) => {
    setProfile((prev) => ({ ...prev, ...updated }));
    addToast('Artisan profile updated successfully', 'success');
  };

  const withdrawFunds = (amount) => {
    if (amount > profile.availableBalance) {
      addToast('Withdrawal amount exceeds available balance', 'error');
      return false;
    }
    const newTxn = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      orderId: `PAYOUT-${new Date().toLocaleString('en-US', { month: 'short' }).toUpperCase()}`,
      amount: amount,
      status: 'Transferred',
      date: 'Just now',
      type: 'Bank Withdrawal',
      channel: profile.bankAccount
    };
    setTransactions((prev) => [newTxn, ...prev]);
    setProfile((prev) => ({
      ...prev,
      availableBalance: prev.availableBalance - amount
    }));
    addToast(`₹${amount.toLocaleString('en-IN')} transferred to your verified bank account!`, 'success');
    return true;
  };

  const sendMessageReply = (conversationId, replyText) => {
    setMessages((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          const newThread = [
            ...conv.thread,
            { sender: 'artisan', text: replyText, time: 'Just now' }
          ];
          return {
            ...conv,
            lastMessage: replyText,
            time: 'Just now',
            unread: false,
            thread: newThread
          };
        }
        return conv;
      })
    );
    addToast('Reply sent to customer', 'success');
  };

  const t = (key) => {
    return i18n.t(key);
  };

  return (
    <SellerContext.Provider
      value={{
        lang,
        setLang,
        t,
        profile,
        updateProfile,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        orders,
        setOrders,
        transactions,
        customers,
        messages,
        sendMessageReply,
        withdrawFunds,
        toasts,
        addToast,
        removeToast,
        selectedOrder,
        setSelectedOrder
      }}
    >
      {children}
    </SellerContext.Provider>
  );
};

export const useSeller = () => useContext(SellerContext);
