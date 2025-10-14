import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

export const useProducts = (category) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let result;
        if (category === 'hero') {
          result = await productService.getHeroProducts();
        } else if (category === 'featured') {
          result = await productService.getFeaturedProducts();
        } else if (category === 'all') {
          result = await productService.getAllProducts();
        } else {
          result = await productService.getProductsByCategory(category);
        }

        if (result.success) {
          setProducts(result.data);
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return { products, loading, error };
};