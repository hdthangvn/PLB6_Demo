import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

export const useProductDetail = (productId) => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch product by ID
        const productResult = await productService.getProductById(parseInt(productId));
        
        if (productResult.success) {
          setProduct(productResult.data);
          
          // Fetch related products based on category
          const relatedResult = await productService.getProductsByCategory(
            productResult.data.category || 'featured', 
            4
          );
          if (relatedResult.success) {
            // Filter out current product
            const filtered = relatedResult.data.filter(p => p.id !== parseInt(productId));
            setRelatedProducts(filtered.slice(0, 4));
          }
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching product detail:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetail();
    }
  }, [productId]);

  return { product, relatedProducts, loading, error };
};