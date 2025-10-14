import { useState } from 'react';

const SearchFilters = ({ onFiltersChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: '',
    maxPrice: '',
    sortBy: 'relevance',
    brands: [],
    cpu: [],
    ram: [],
    // TV
    tvResolutions: [], // ['4K','8K']
    tvPanels: [], // ['OLED','QLED','MiniLED']
    tvSizes: [], // ['43"','55"','65"','75"']
    // Camera
    cameraSensors: [], // ['Full Frame','APS-C']
    cameraTypes: [], // ['Mirrorless','Action Cam','DSLR']
    cameraMp: [], // ['<=24MP','25-40MP','>40MP'] (dùng khi có data)
    // Audio
    audioTypes: [], // ['Tai nghe','Earbuds','Micro','Loa']
    audioFeatures: [], // ['Chống ồn','Bluetooth','Có dây']
    // Accessories
    accessoriesTypes: [], // ['Sạc','Chuột','Bàn phím','Hub','Pin dự phòng','Tripod']
    // Home
    homeTypes: [], // ['Robot hút bụi','Nồi chiên','Lọc không khí','Máy giặt','Lò vi sóng']
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

  // Dynamic brand options theo danh mục
  const brandOptionsByCategory = {
    all: ['Apple','Samsung','Dell','ASUS','Sony','MSI','LG','Xiaomi','OPPO','Google','Lenovo','Bose','Canon','Nikon','Fujifilm','GoPro','JBL','Marshall','Sennheiser','Acer','Realme','Vivo','OnePlus','Belkin','Anker','Logitech','Keychron','Peak Design','Sharp','Electrolux','Dyson'],
    smartphones: ['Apple','Samsung','Google','Xiaomi','OPPO','Vivo','OnePlus','Nothing','Realme'],
    laptops: ['Apple','Dell','ASUS','HP','Lenovo','MSI','Acer','LG'],
    audio: ['Sony','Apple','Bose','Sennheiser','JBL','Marshall'],
    camera: ['Canon','Sony','Nikon','Fujifilm','GoPro'],
    tv: ['Samsung','LG','Sony','TCL','Xiaomi'],
    pc: ['ASUS','MSI','HP','Dell','Lenovo','Apple'],
    accessories: ['Anker','Belkin','Logitech','Keychron','Peak Design','Apple'],
    home: ['Dyson','Xiaomi','Philips','Sharp','Electrolux','LG']
  };
  const availableBrands = brandOptionsByCategory[filters.category] || brandOptionsByCategory.all;
  const supportsCpuRam = ['laptops','pc','smartphones'].includes(filters.category);
  const cpuOptions = filters.category === 'smartphones'
    ? ['Apple A','Snapdragon','Dimensity','Exynos']
    : ['i3','i5','i7','Ryzen 5','Ryzen 7'];
  const ramOptions = filters.category === 'smartphones'
    ? ['6GB','8GB','12GB','16GB']
    : ['8GB','16GB','32GB'];
  const isTV = filters.category === 'tv';
  const isCamera = filters.category === 'camera';
  const isAudio = filters.category === 'audio';
  const isAccessories = filters.category === 'accessories';
  const isHome = filters.category === 'home';

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
      sortBy: 'relevance',
      brands: [],
      cpu: [],
      ram: []
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

        {/* Advanced Filters */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lọc nâng cao:
          </label>
          <div className="space-y-4">
            {/* Brand - hiển thị theo danh mục */}
            <div>
              <div className="text-sm text-gray-600 mb-1">Brand</div>
              <div className="grid grid-cols-2 gap-2">
                {availableBrands.map(b => (
                  <label key={b} className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" checked={filters.brands.includes(b)} onChange={(e)=>{
                      const next = e.target.checked ? [...filters.brands,b] : filters.brands.filter(x=>x!==b);
                      handleFilterChange('brands', next);
                    }} />
                    <span>{b}</span>
                  </label>
                ))}
              </div>
            </div>


            {supportsCpuRam && (
              <>
                {/* CPU */}
                <div>
                  <div className="text-sm text-gray-600 mb-1">CPU</div>
                  <div className="grid grid-cols-2 gap-2">
                    {cpuOptions.map(c => (
                      <label key={c} className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" checked={filters.cpu.includes(c)} onChange={(e)=>{
                          const next = e.target.checked ? [...filters.cpu,c] : filters.cpu.filter(x=>x!==c);
                          handleFilterChange('cpu', next);
                        }} />
                        <span>{c}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* RAM */}
                <div>
                  <div className="text-sm text-gray-600 mb-1">RAM</div>
                  <div className="grid grid-cols-3 gap-2">
                    {ramOptions.map(r => (
                      <label key={r} className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" checked={filters.ram.includes(r)} onChange={(e)=>{
                          const next = e.target.checked ? [...filters.ram,r] : filters.ram.filter(x=>x!==r);
                          handleFilterChange('ram', next);
                        }} />
                        <span>{r}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {isTV && (
              <>
                {/* TV Resolution */}
                <div>
                  <div className="text-sm text-gray-600 mb-1">Độ phân giải</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['4K','8K'].map(r => (
                      <label key={r} className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" checked={filters.tvResolutions.includes(r)} onChange={(e)=>{
                          const next = e.target.checked ? [...filters.tvResolutions,r] : filters.tvResolutions.filter(x=>x!==r);
                          handleFilterChange('tvResolutions', next);
                        }} />
                        <span>{r}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* TV Panel */}
                <div>
                  <div className="text-sm text-gray-600 mb-1">Tấm nền</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['OLED','QLED','MiniLED'].map(p => (
                      <label key={p} className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" checked={filters.tvPanels.includes(p)} onChange={(e)=>{
                          const next = e.target.checked ? [...filters.tvPanels,p] : filters.tvPanels.filter(x=>x!==p);
                          handleFilterChange('tvPanels', next);
                        }} />
                        <span>{p}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* TV Size */}
                <div>
                  <div className="text-sm text-gray-600 mb-1">Kích thước</div>
                  <div className="grid grid-cols-4 gap-2">
                    {["43\"","55\"","65\"","75\""].map(s => (
                      <label key={s} className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" checked={filters.tvSizes.includes(s)} onChange={(e)=>{
                          const next = e.target.checked ? [...filters.tvSizes,s] : filters.tvSizes.filter(x=>x!==s);
                          handleFilterChange('tvSizes', next);
                        }} />
                        <span>{s}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {isCamera && (
              <>
                {/* Camera Sensor */}
                <div>
                  <div className="text-sm text-gray-600 mb-1">Cảm biến</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['Full Frame','APS-C'].map(s => (
                      <label key={s} className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" checked={filters.cameraSensors.includes(s)} onChange={(e)=>{
                          const next = e.target.checked ? [...filters.cameraSensors,s] : filters.cameraSensors.filter(x=>x!==s);
                          handleFilterChange('cameraSensors', next);
                        }} />
                        <span>{s}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Camera Type */}
                <div>
                  <div className="text-sm text-gray-600 mb-1">Loại máy</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['Mirrorless','DSLR','Action Cam'].map(t => (
                      <label key={t} className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" checked={filters.cameraTypes.includes(t)} onChange={(e)=>{
                          const next = e.target.checked ? [...filters.cameraTypes,t] : filters.cameraTypes.filter(x=>x!==t);
                          handleFilterChange('cameraTypes', next);
                        }} />
                        <span>{t}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {isAudio && (
              <>
                {/* Audio Type */}
                <div>
                  <div className="text-sm text-gray-600 mb-1">Loại</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['Tai nghe','Earbuds','Micro','Loa'].map(t => (
                      <label key={t} className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" checked={filters.audioTypes.includes(t)} onChange={(e)=>{
                          const next = e.target.checked ? [...filters.audioTypes,t] : filters.audioTypes.filter(x=>x!==t);
                          handleFilterChange('audioTypes', next);
                        }} />
                        <span>{t}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Audio Features */}
                <div>
                  <div className="text-sm text-gray-600 mb-1">Tính năng</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['Chống ồn','Bluetooth','Có dây'].map(f => (
                      <label key={f} className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" checked={filters.audioFeatures.includes(f)} onChange={(e)=>{
                          const next = e.target.checked ? [...filters.audioFeatures,f] : filters.audioFeatures.filter(x=>x!==f);
                          handleFilterChange('audioFeatures', next);
                        }} />
                        <span>{f}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {isAccessories && (
              <>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Loại phụ kiện</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['Sạc','Chuột','Bàn phím','Hub','Pin dự phòng','Tripod'].map(t => (
                      <label key={t} className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" checked={filters.accessoriesTypes.includes(t)} onChange={(e)=>{
                          const next = e.target.checked ? [...filters.accessoriesTypes,t] : filters.accessoriesTypes.filter(x=>x!==t);
                          handleFilterChange('accessoriesTypes', next);
                        }} />
                        <span>{t}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {isHome && (
              <>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Loại thiết bị</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['Robot hút bụi','Nồi chiên','Lọc không khí','Máy giặt','Lò vi sóng'].map(t => (
                      <label key={t} className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" checked={filters.homeTypes.includes(t)} onChange={(e)=>{
                          const next = e.target.checked ? [...filters.homeTypes,t] : filters.homeTypes.filter(x=>x!==t);
                          handleFilterChange('homeTypes', next);
                        }} />
                        <span>{t}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Clear Filters button removed as requested */}
      </div>
    </div>
  );
};

export default SearchFilters;