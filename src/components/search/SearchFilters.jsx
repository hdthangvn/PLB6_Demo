import { useState } from 'react';

const SearchFilters = ({ onFiltersChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: '',
    maxPrice: '',
    sortBy: 'relevance',
    ...initialFilters
  });

  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { key: 'all', name: 'Tất cả' },
    { key: 'smartphones', name: 'Điện thoại' },
    { key: 'laptops', name: 'Laptop' },
    { key: 'audio', name: 'Âm thanh' },
    { key: 'camera', name: 'Camera' },
    { key: 'tv', name: 'TV' },
    { key: 'pc', name: 'PC' },
    { key: 'accessories', name: 'Phụ kiện' },
    { key: 'home', name: 'Gia dụng' }
  ];

  const sortOptions = [
    { key: 'relevance', name: 'Liên quan nhất' },
    { key: 'price-asc', name: 'Giá thấp đến cao' },
    { key: 'price-desc', name: 'Giá cao đến thấp' },
    { key: 'name', name: 'Tên A-Z' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      category: 'all',
      minPrice: '',
      maxPrice: '',
      sortBy: 'relevance'
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      {/* Mobile Filter Toggle */}
      <div className="flex items-center justify-between mb-4 md:hidden">
        <h3 className="font-medium">Lọc kết quả</h3>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-blue-600 text-sm"
        >
          {showFilters ? 'Thu gọn' : 'Mở rộng'}
        </button>
      </div>

      <div className={`space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sắp xếp theo:
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map(option => (
              <option key={option.key} value={option.key}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Danh mục:
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category.key} value={category.key}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Khoảng giá (VNĐ):
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Từ"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Đến"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          className="w-full px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
        >
          Xóa bộ lọc
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;