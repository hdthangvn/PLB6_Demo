import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import ProductSection from '../../components/common/ProductSection';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';

const ProductList = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { products, loading, error } = useProducts(category);
  const { categories } = useCategories();

  // ✅ TÌM TÊN DANH MỤC DỰA TRÊN KEY
  const currentCategory = categories.find(cat => cat.key === category);
  const categoryName = currentCategory?.name || category;

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="ml-4 text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-red-600">Lỗi: {error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Về trang chủ
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Trang chủ
                </button>
              </li>
              <li>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </li>
              <li>
                <span className="text-gray-900 font-medium">{categoryName}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product List */}
      <ProductSection
        title={categoryName}
        products={products}
        onProductClick={handleProductClick}
        showViewAll={false}
        backgroundColor="bg-white"
      />
    </MainLayout>
  );
};

export default ProductList;