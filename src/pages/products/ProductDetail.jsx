import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import ProductGallery from '../../components/products/ProductGallery';
import ProductInfo from '../../components/products/ProductInfo';
import ProductSpecifications from '../../components/products/ProductSpecifications';
import ShopInfo from '../../components/products/ShopInfo';
import ProductReviews from '../../components/products/ProductReviews';
import ProductComments from '../../components/products/ProductComments';
import ProductSection from '../../components/common/ProductSection';
import { useProductDetail } from '../../hooks/useProductDetail';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { useVariants } from '../../hooks/useVariants';
import { useEffect, useState } from 'react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProductDetail(id);
  const { categories } = useCategories();
  const { variants, loading: variantsLoading } = useVariants(id);
  
  // ✅ KHÔNG BLOCK UI KHI VARIANTS LOADING
  const isLoading = loading; // Chỉ block khi product loading, không block khi variants loading
  
  // ✅ SỬA: Tạo state riêng cho related products
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

  // ✅ TÌM TÊN DANH MỤC DỰA TRÊN category từ API
  const getCategoryKeyFromProduct = (product) => {
    if (!product?.category) return 'all';
    if (product.category === 'Laptop') return 'laptops';
    if (product.category === 'Phone' || product.category === 'Äiá»n thoáº¡i') return 'smartphones';
    return product.category.toLowerCase();
  };
  
  const categoryKey = getCategoryKeyFromProduct(product);
  const currentCategory = categories.find(cat => cat.key === categoryKey);
  const categoryName = currentCategory?.name || (categoryKey === 'all' ? 'Tất cả sản phẩm' : product?.category || 'Sản phẩm');

  // ✅ SỬA: Fetch related products sau khi có product
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product || !product.category) return;
      
      setRelatedLoading(true);
      try {
        // Import productService để gọi trực tiếp
        const { productService } = await import('../../services/productService');
        
        // Map category từ API sang format đúng
        let categoryForAPI = product.category;
        if (product.category === 'Äiá»n thoáº¡i') categoryForAPI = 'Phone';
        if (product.category === 'Laptop') categoryForAPI = 'Laptop';
        
        console.log('🔄 ProductDetail: Category mapping:', product.category, '→', categoryForAPI);
        
        const result = await productService.getProductsByCategory(categoryForAPI, 8);
        
        if (result.success) {
          // Lọc bỏ sản phẩm hiện tại và chỉ lấy 4 sản phẩm
          const filtered = result.data
            .filter(p => p.id !== id)
            .slice(0, 4);
          setRelatedProducts(filtered);
        }
      } catch (err) {
        console.error('Error fetching related products:', err);
      } finally {
        setRelatedLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [product, id]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải sản phẩm...</p>
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
                <button
                  onClick={() => navigate(`/products/${categoryKey}`)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {categoryName}
                </button>
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
        {/* PHẦN 1: Gallery + Product Info (50:50) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Gallery */}
          <div>
            <ProductGallery product={product} />
          </div>

          {/* Product Info */}
          <div>
            <ProductInfo product={product} variants={variants} variantsLoading={variantsLoading} />
          </div>
        </div>

        {/* PHẦN 2: Specifications + Shop Info (50:50) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Specifications */}
          <div>
            <ProductSpecifications product={product} />
          </div>

          {/* Shop Info */}
          <div>
            <ShopInfo shop={product?.store} />
          </div>
        </div>

        {/* PHẦN 3: Reviews (100% width) */}
        <div className="mb-12">
          <ProductReviews product={product} />
        </div>

        {/* PHẦN 3.5: Comments (100% width) */}
        <div className="mb-12">
          <ProductComments productId={product.id} />
        </div>

        {/* ✅ PHẦN 4: Related Products (100% width) - LUÔN HIỂN THỊ */}
        <div className="mb-12">
          {relatedLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Đang tải sản phẩm liên quan...</p>
            </div>
          ) : relatedProducts.length > 0 ? (
            <ProductSection
              title="Sản phẩm liên quan"
              products={relatedProducts}
              onProductClick={handleRelatedProductClick}
              backgroundColor="bg-gray-50"
              showViewAll={false}
            />
          ) : (
            // ✅ KHÔNG CÓ MOCK DATA - chỉ hiển thị khi không có related products
            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Sản phẩm liên quan</h2>
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-4">📦</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Chưa có sản phẩm liên quan
                </h3>
                <p className="text-gray-600">
                  Không tìm thấy sản phẩm cùng danh mục
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetail;