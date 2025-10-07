import { useState } from 'react';

const ProductGallery = ({ images = [], productName = '' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Default images nếu không có images được truyền vào
  const defaultImages = [
    'https://via.placeholder.com/500x500?text=Product+Image',
    'https://via.placeholder.com/500x500?text=Product+Image+2',
    'https://via.placeholder.com/500x500?text=Product+Image+3'
  ];
  
  const galleryImages = images.length > 0 ? images : defaultImages;

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={galleryImages[currentImageIndex]}
          alt={`${productName} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Thumbnail Images */}
      {galleryImages.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden border-2 transition-colors ${
                currentImageIndex === index 
                  ? 'border-blue-500' 
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      <div className="text-center text-sm text-gray-500">
        {currentImageIndex + 1} / {galleryImages.length}
      </div>
    </div>
  );
};

export default ProductGallery;