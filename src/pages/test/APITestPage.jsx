import React, { useState } from 'react';
import { brandService } from '../../services/brandService';
import { storeService } from '../../services/storeService';
import { variantService } from '../../services/variantService';
import { reviewService } from '../../services/reviewService';

const APITestPage = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});

  const testAPI = async (apiName, apiFunction) => {
    setLoading(prev => ({ ...prev, [apiName]: true }));
    try {
      const result = await apiFunction();
      setResults(prev => ({ ...prev, [apiName]: result }));
    } catch (error) {
      setResults(prev => ({ ...prev, [apiName]: { success: false, error: error.message } }));
    } finally {
      setLoading(prev => ({ ...prev, [apiName]: false }));
    }
  };

  const apiTests = [
    {
      name: 'Brands API',
      description: 'GET /api/v1/brands',
      test: () => brandService.getBrands(),
      buttonText: 'Test Brands'
    },
    {
      name: 'Stores API',
      description: 'GET /api/v1/stores',
      test: () => storeService.getStores(),
      buttonText: 'Test Stores'
    },
    {
      name: 'Latest Variants API',
      description: 'GET /api/v1/product-variants/latest',
      test: () => variantService.getLatestVariants(),
      buttonText: 'Test Latest Variants'
    },
    {
      name: 'Product Reviews API',
      description: 'GET /api/v1/reviews/product/{productId}',
      test: () => reviewService.getProductReviews('68f7a2da142446f31f43e3f8'),
      buttonText: 'Test Product Reviews'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            🧪 API Testing Dashboard
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {apiTests.map((api, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {api.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {api.description}
                </p>
                
                <button
                  onClick={() => testAPI(api.name, api.test)}
                  disabled={loading[api.name]}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                    loading[api.name]
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {loading[api.name] ? '⏳ Testing...' : `🚀 ${api.buttonText}`}
                </button>

                {results[api.name] && (
                  <div className="mt-4 p-4 rounded-lg border">
                    <div className={`text-sm font-medium mb-2 ${
                      results[api.name].success ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {results[api.name].success ? '✅ Success' : '❌ Failed'}
                    </div>
                    
                    {results[api.name].success ? (
                      <div className="text-xs text-gray-600">
                        <div className="mb-2">
                          <strong>Data Count:</strong> {Array.isArray(results[api.name].data) ? results[api.name].data.length : 'N/A'}
                        </div>
                        <div className="max-h-32 overflow-y-auto bg-gray-100 p-2 rounded text-xs">
                          <pre>{JSON.stringify(results[api.name].data, null, 2)}</pre>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-red-600">
                        <strong>Error:</strong> {results[api.name].error}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              📍 Cách test trên giao diện:
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>Brands:</strong> Vào trang Store → Brands hoặc Search Filters</li>
              <li>• <strong>Stores:</strong> Vào trang Store hoặc Product Detail → Shop Info</li>
              <li>• <strong>Variants:</strong> Vào Product Detail → Product Options</li>
              <li>• <strong>Reviews:</strong> Vào Product Detail → Reviews Section</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APITestPage;
