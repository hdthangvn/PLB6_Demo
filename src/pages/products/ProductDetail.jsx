import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import ProductGallery from '../../components/products/ProductGallery';
import ProductInfo from '../../components/products/ProductInfo';
import ProductSection from '../../components/common/ProductSection';
import { useProductDetail } from '../../hooks/useProductDetail';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, relatedProducts, loading, error } = useProductDetail(id);

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

  if (error || !product) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm</h2>
            <p className="text-gray-600 mb-6">Sản phẩm bạn tìm không tồn tại hoặc đã bị xóa.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const handleRelatedProductClick = (relatedProduct) => {
    navigate(`/product/${relatedProduct.id}`);
  };

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
                <span className="text-gray-500">{product.category || 'Sản phẩm'}</span>
              </li>
              <li>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </li>
              <li>
                <span className="text-gray-900 font-medium">{product.name}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Gallery */}
          <div>
            <ProductGallery product={product} />
          </div>

          {/* Product Info */}
          <div>
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Mô tả sản phẩm</h2>
          <div className="prose max-w-none text-gray-700">
            <p>{product.description || 'Đây là một sản phẩm tuyệt vời với nhiều tính năng nổi bật.'}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            
            <h3>Thông số kỹ thuật:</h3>
            <ul>
              <li>Chất lượng cao, bền bỉ</li>
              <li>Thiết kế hiện đại, sang trọng</li>
              <li>Tính năng thông minh</li>
              <li>Bảo hành chính hãng</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <ProductSection
          title="Sản phẩm liên quan"
          products={relatedProducts}
          columns="lg:grid-cols-4"
          onProductClick={handleRelatedProductClick}
          showViewAll={false}
          backgroundColor="bg-gray-50"
        />
      )}
    </MainLayout>
  );
};

export default ProductDetail;