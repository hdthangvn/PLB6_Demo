import { useState, useEffect } from 'react';
import { storeService } from '../services/storeService';

export const useStores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await storeService.getStores();
        if (result.success) {
          setStores(result.data);
        } else {
          setError('Failed to fetch stores');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching stores:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  return { stores, loading, error };
};
