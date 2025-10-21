import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../hooks/useSearch';
import { useBrands } from '../../hooks/useBrands';

const SearchBar = ({ onSearch, className = "" }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const { suggestions, getSuggestions } = useSearch();
  const { brands } = useBrands();
  const searchRef = useRef(null);

  // ✅ TÍCH HỢP BRANDS API: Kết hợp suggestions với brands (loại bỏ duplicate)
  const allSuggestions = [
    ...suggestions,
    ...brands.filter(brand => 
      brand.name.toLowerCase().includes(query.toLowerCase())
    ).map(brand => `${brand.name} (Thương hiệu)`)
  ];
  
  // ✅ LOẠI BỎ DUPLICATE BRANDS (ASUS vs Asus)
  const uniqueSuggestions = allSuggestions.filter((suggestion, index, self) => {
    if (suggestion.includes('(Thương hiệu)')) {
      const brandName = suggestion.replace(' (Thương hiệu)', '').toLowerCase();
      return self.findIndex(s => 
        s.includes('(Thương hiệu)') && 
        s.replace(' (Thương hiệu)', '').toLowerCase() === brandName
      ) === index;
    }
    return true;
  });

  // Debounce suggestions
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        getSuggestions(query);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, getSuggestions]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query.trim());
    }
  };

  const performSearch = (searchQuery) => {
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.includes('(Thương hiệu)')) {
      // ✅ KHI CLICK BRAND: Search theo brand thay vì tên
      const brandName = suggestion.replace(' (Thương hiệu)', '');
      setQuery(brandName);
      navigate(`/search?q=${encodeURIComponent(brandName)}&brand=${encodeURIComponent(brandName)}`);
    } else {
      setQuery(suggestion);
      performSearch(suggestion);
    }
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm sản phẩm, thương hiệu..."
            className="w-full px-4 py-3 pr-12 text-sm border-2 border-blue-500 rounded-lg focus:outline-none focus:border-blue-600"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 h-full px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </button>
        </div>
      </form>

      {/* Search Suggestions */}
      {showSuggestions && uniqueSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {uniqueSuggestions.slice(0, 8).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <span className="text-sm">{suggestion}</span>
                {suggestion.includes('(Thương hiệu)') && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                    Brand
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;