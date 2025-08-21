import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiClient from '../api/client';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

    const fetchCart = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const { data } = await apiClient.get('/cart');
      setCart(data.items || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load cart');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

   const syncCart = useCallback(async (updatedCart) => {
    try {
      await apiClient.put('/cart', { items: updatedCart });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update cart');
      throw err;
    }
  }, []);

  const addToCart = async (product, quantity = 1) => {
    try {
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.productId === product._id);
        let newCart;
        
        if (existingItem) {
          newCart = prevCart.map(item =>
            item.productId === product._id 
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newCart = [...prevCart, { 
            productId: product._id,
            name: product.name,
            price: product.price,
            image: product.images?.[0],
            quantity
          }];
        }

        syncCart(newCart);
        return newCart;
      });
    } catch (err) {
      console.error('Add to cart error:', err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setCart(prevCart => {
        const newCart = prevCart.filter(item => item.productId !== productId);
        syncCart(newCart);
        return newCart;
      });
    } catch (err) {
      console.error('Remove from cart error:', err);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      await removeFromCart(productId);
      return;
    }

    try {
      setCart(prevCart => {
        const newCart = prevCart.map(item =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        );
        syncCart(newCart);
        return newCart;
      });
    } catch (err) {
      console.error('Update quantity error:', err);
    }
  };

  const clearCart = async () => {
    try {
      await apiClient.delete('/cart');
      setCart([]);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to clear cart');
    }
  };

  const cartTotal = cart.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  const cartCount = cart.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        loading,
        error,
        resetError: () => setError(null)
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}