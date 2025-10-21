import { useState, useEffect } from 'react';
import { brandService } from '../services/brandService';

export const useBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await brandService.getBrands();
        if (result.success) {
          setBrands(result.data);
        } else {
          setError('Failed to fetch brands');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching brands:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  return { brands, loading, error };
};
