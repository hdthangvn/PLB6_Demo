import { useState, useCallback } from 'react';
import { searchService } from '../services/searchService';

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  // Search products
  const searchProducts = useCallback(async (query, filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await searchService.searchProducts(query, filters);
      
      if (result.success) {
        setSearchResults(result.data.products);
        setTotalResults(result.data.total);
      } else {
        setError('Lỗi tìm kiếm');
      }
    } catch (err) {
      setError(err.message);
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get search suggestions
  const getSuggestions = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const result = await searchService.getSearchSuggestions(query);
      if (result.success) {
        setSuggestions(result.data);
      }
    } catch (err) {
      console.error('Suggestions error:', err);
    }
  }, []);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setSuggestions([]);
    setTotalResults(0);
    setError(null);
  }, []);

  return {
    searchResults,
    suggestions,
    loading,
    error,
    totalResults,
    searchProducts,
    getSuggestions,
    clearSearch
  };
};