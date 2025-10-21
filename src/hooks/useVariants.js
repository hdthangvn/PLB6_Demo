import { useState, useEffect } from 'react';
import { variantService } from '../services/variantService';

export const useVariants = (productId) => {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVariants = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const result = await variantService.getVariantsByProduct(productId);
        if (result.success) {
          setVariants(result.data);
        } else {
          // ✅ KHÔNG BLOCK UI KHI API LỖI
          console.warn('Variants API failed:', result.error);
          setVariants([]); // Set empty array instead of error
        }
      } catch (err) {
        // ✅ KHÔNG BLOCK UI KHI API LỖI
        console.warn('Variants API error:', err.message);
        setVariants([]); // Set empty array instead of error
      } finally {
        setLoading(false);
      }
    };
    fetchVariants();
  }, [productId]);

  return { variants, loading, error };
};
