import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { storeService } from '../../services/storeService';
import { productService } from '../../services/productService';
import Button from '../../components/ui/Button';
import ProductCard from '../../components/products/ProductCard';

const StoreDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch store details
        const storeResult = await storeService.getStoreById(id);
        if (storeResult.success) {
          setStore(storeResult.data);
        } else {
          setError('Không thể tải thông tin cửa hàng');
        }

        // Fetch store products (if API exists)
        try {
          const productsResult = await productService.getProductsByStore(id);
          if (productsResult.success) {
            setProducts(productsResult.data);
          }
        } catch (err) {
          console.warn('Could not fetch store products:', err);
          // Continue without products
        }

      } catch (err) {
        setError(err.message);
        console.error('Error fetching store data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStoreData();
    }
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải thông tin cửa hàng...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !store) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy cửa hàng</h2>
            <p className="text-gray-600 mb-4">{error || 'Cửa hàng không tồn tại'}</p>
            <Button onClick={() => navigate('/stores')}>
              Quay lại danh sách cửa hàng
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Store Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-lg font-bold">
                    {store.name?.charAt(0) || 'S'}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {store.name || 'Cửa hàng'}
                  </h1>
                  <p className="text-gray-600">
                    {store.description || 'Cửa hàng uy tín trên TechStore'}
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/stores')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← Quay lại danh sách
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Store Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Thông tin cửa hàng
                </h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-gray-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Địa chỉ</p>
                      <p className="text-gray-600 text-xs">{typeof store.address === 'string' ? store.address : 'Chưa cập nhật'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-gray-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Điện thoại</p>
                      <p className="text-gray-600 text-xs">{store.phone || 'Chưa cập nhật'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-gray-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Email</p>
                      <p className="text-gray-600 text-xs">{store.email || 'Chưa cập nhật'}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button className="flex-1 text-xs py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">
                    Chat
                  </Button>
                  <Button className="flex-1 text-xs py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors">
                    Gọi
                  </Button>
                </div>
              </div>
            </div>

            {/* Store Products */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Sản phẩm của cửa hàng
                  </h2>
                  <span className="text-sm text-gray-500">
                    {products.length} sản phẩm
                  </span>
                </div>
                
                {products.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-gray-400 text-3xl mb-2">📦</div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      Chưa có sản phẩm
                    </h3>
                    <p className="text-gray-600 text-xs">
                      Cửa hàng chưa đăng sản phẩm nào
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StoreDetailPage;
