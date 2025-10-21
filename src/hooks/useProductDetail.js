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
        
        console.log('🔍 Fetching product with ID:', productId);
        
        // Fetch product by ID
        const productResult = await productService.getProductById(productId);
        
        if (productResult.success) {
          console.log('✅ Product found:', productResult.data);
          console.log('📂 Product category:', productResult.data.category);
          
          setProduct(productResult.data);
          
          // Fetch related products based on category
          let categoryForAPI = productResult.data.category || 'featured';
          // Map category từ API sang format đúng
          if (productResult.data.category === 'Äiá»n thoáº¡i') categoryForAPI = 'Phone';
          if (productResult.data.category === 'Laptop') categoryForAPI = 'Laptop';
          
          console.log('🔄 Category for related products API:', categoryForAPI);
          
          const relatedResult = await productService.getProductsByCategory(categoryForAPI, 4);
          if (relatedResult.success) {
            console.log('📦 Related products raw:', relatedResult.data);
            // Filter out current product
            const filtered = relatedResult.data.filter(p => p.id !== productId);
            console.log('✂️ Filtered related products:', filtered);
            setRelatedProducts(filtered.slice(0, 4));
          } else {
            console.log('❌ No related products found for category:', categoryForAPI);
            setRelatedProducts([]);
          }
        } else {
          console.log('❌ Product not found:', productResult.error);
          setError('Product not found');
        }
      } catch (err) {
        console.error('💥 Error fetching product detail:', err);
        setError(err.message);
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