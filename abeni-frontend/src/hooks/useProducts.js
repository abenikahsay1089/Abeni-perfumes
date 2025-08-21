// src/hooks/useProducts.js
import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';

const fetchProducts = async () => {
  try {
    console.log('Fetching products from:', apiClient.defaults.baseURL);
    const response = await apiClient.get('/products');
    console.log('Products response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: 1000,
    onError: (error) => {
      console.error('Products fetch error:', error);
    }
  });
};