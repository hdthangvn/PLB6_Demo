import { useState } from 'react';
import { getProductGallery } from '../../utils/imageUtils';

const ProductGallery = ({ product, images = [] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // ✅ SỬ DỤNG IMAGES TỪ PRODUCT HOẶC TỰ ĐỘNG TẠO
  let galleryImages = images;
  
  if (images.length === 0 && product) {
    // Tự động tạo gallery từ product info
    galleryImages = getProductGallery(product.id, product.category);
  }
  
  // Fallback nếu vẫn không có images
  if (galleryImages.length === 0) {
    galleryImages = [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&q=80'
    ];
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-lg">
        <img
          src={galleryImages[currentImageIndex]}
          alt={`${product?.name || 'Product'} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Thumbnail Images */}
      {galleryImages.length > 1 && (
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:shadow-md ${
                currentImageIndex === index 
                  ? 'border-blue-500 shadow-lg scale-105' 
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={image}
                alt={`${product?.name || 'Product'} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter & Actions */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>
          {currentImageIndex + 1} / {galleryImages.length}
        </div>
        
        {/* Navigation Arrows */}
        {galleryImages.length > 1 && (
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentImageIndex(
                currentImageIndex === 0 ? galleryImages.length - 1 : currentImageIndex - 1
              )}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button
              onClick={() => setCurrentImageIndex(
                currentImageIndex === galleryImages.length - 1 ? 0 : currentImageIndex + 1
              )}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Next image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Zoom Hint */}
      <div className="text-center">
        <span className="text-xs text-gray-400 flex items-center justify-center">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
          </svg>
          Hover để phong to
        </span>
      </div>
    </div>
  );
};

export default ProductGallery;