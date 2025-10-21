import React, { useState } from 'react';
import { useBrands } from '../../hooks/useBrands';
import { useStores } from '../../hooks/useStores';
import { useVariants } from '../../hooks/useVariants';
import { reviewService } from '../../services/reviewService';

const APIStatusWidget = () => {
  const { brands, loading: brandsLoading } = useBrands();
  const { stores, loading: storesLoading } = useStores();
  const { variants, loading: variantsLoading } = useVariants('68f7a2da142446f31f43e3f8');
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const testReviewsAPI = async () => {
    setReviewsLoading(true);
    try {
      const result = await reviewService.getProductReviews('68f7a2da142446f31f43e3f8');
      if (result.success) {
        setReviews(result.data);
      }
    } catch (error) {
      console.error('Reviews API Error:', error);
    } finally {
      setReviewsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4 border border-blue-200">
      <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
        🔗 API Status Dashboard
        <span className="ml-2 text-sm font-normal text-blue-600">(Real-time)</span>
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Brands API */}
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">🏷️ Brands</span>
            <span className={`text-xs px-2 py-1 rounded ${
              brandsLoading ? 'bg-yellow-100 text-yellow-700' : 
              brands.length > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {brandsLoading ? 'Loading...' : `${brands.length} brands`}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {brands.slice(0, 3).map(b => b.name).join(', ')}
            {brands.length > 3 && '...'}
          </div>
        </div>

        {/* Stores API */}
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">🏪 Stores</span>
            <span className={`text-xs px-2 py-1 rounded ${
              storesLoading ? 'bg-yellow-100 text-yellow-700' : 
              stores.length > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {storesLoading ? 'Loading...' : `${stores.length} stores`}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {stores.slice(0, 2).map(s => s.name).join(', ')}
            {stores.length > 2 && '...'}
          </div>
        </div>

        {/* Variants API */}
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">🔧 Variants</span>
            <span className={`text-xs px-2 py-1 rounded ${
              variantsLoading ? 'bg-yellow-100 text-yellow-700' : 
              variants.length > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {variantsLoading ? 'Loading...' : `${variants.length} variants`}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {variants.slice(0, 2).map(v => v.name?.substring(0, 20)).join(', ')}
            {variants.length > 2 && '...'}
          </div>
        </div>

        {/* Reviews API */}
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">⭐ Reviews</span>
            <button
              onClick={testReviewsAPI}
              disabled={reviewsLoading}
              className={`text-xs px-2 py-1 rounded ${
                reviewsLoading ? 'bg-yellow-100 text-yellow-700' : 
                reviews.length > 0 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
              }`}
            >
              {reviewsLoading ? 'Testing...' : reviews.length > 0 ? `${reviews.length} reviews` : 'Test API'}
            </button>
          </div>
          <div className="text-xs text-gray-500">
            {reviews.length > 0 ? 'API working!' : 'Click to test'}
          </div>
        </div>
      </div>

      <div className="mt-3 text-xs text-blue-600 bg-blue-50 rounded p-2">
        💡 <strong>Tip:</strong> These APIs are now integrated into Search Filters, Product Details, and Reviews sections!
      </div>
    </div>
  );
};

export default APIStatusWidget;
