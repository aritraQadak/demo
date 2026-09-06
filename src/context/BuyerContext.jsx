import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const BuyerContext = createContext();

export function BuyerProvider({ children }) {
  // Cart items persisted in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('karigar_buyer_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.warn('Error loading buyer cart:', e);
      return [];
    }
  });

  // Saved / Bookmarked items persisted in localStorage
  const [savedItemIds, setSavedItemIds] = useState(() => {
    try {
      const saved = localStorage.getItem('karigar_buyer_saved');
      return saved ? JSON.parse(saved) : ['wb-nk-042', 'jk-pashmina-01'];
    } catch (e) {
      console.warn('Error loading buyer saved items:', e);
      return ['wb-nk-042', 'jk-pashmina-01'];
    }
  });

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('karigar_buyer_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Error saving buyer cart:', e);
    }
  }, [cart]);

  // Sync saved items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('karigar_buyer_saved', JSON.stringify(savedItemIds));
    } catch (e) {
      console.warn('Error saving buyer wishlist:', e);
    }
  }, [savedItemIds]);

  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) return;
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleSaveItem = (productId) => {
    setSavedItemIds(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isSaved = (productId) => savedItemIds.includes(productId);

  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }, [cart]);

  const artisanDirectTotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const share = item.product.artisanShareAmount || (item.product.price * 0.9);
      return sum + (share * item.quantity);
    }, 0);
  }, [cart]);

  return (
    <BuyerContext.Provider
      value={{
        cart,
        cartItemCount,
        cartTotal,
        artisanDirectTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        savedItemIds,
        toggleSaveItem,
        isSaved
      }}
    >
      {children}
    </BuyerContext.Provider>
  );
}

export function useBuyer() {
  const context = useContext(BuyerContext);
  if (!context) {
    throw new Error('useBuyer must be used within a BuyerProvider');
  }
  return context;
}
