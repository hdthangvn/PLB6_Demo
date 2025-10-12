import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const ReviewForm = ({ onSubmit, onCancel, loading = false }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    content: '',
    images: []
  });
  const [errors, setErrors] = useState({});

  const handleRatingClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: null }));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setErrors(prev => ({ ...prev, images: 'Chỉ được tải tối đa 5 ảnh' }));
      return;
    }

    // Create preview URLs
    const imageData = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));

    setFormData(prev => ({ ...prev, images: imageData }));
    setErrors(prev => ({ ...prev, images: null }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.rating) {
      newErrors.rating = 'Vui lòng chọn số sao đánh giá';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Vui lòng nhập nội dung đánh giá';
    } else if (formData.content.trim().length < 10) {
      newErrors.content = 'Nội dung đánh giá phải có ít nhất 10 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await onSubmit({
        ...formData,
        userName: user?.name,
        verifiedPurchase: true // This should come from backend verification
      });
      
      // Reset form
      setFormData({
        rating: 0,
        title: '',
        content: '',
        images: []
      });
    } catch (err) {
      setErrors({ submit: err.message });
    }
  };

  const renderStars = () => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingClick(star)}
            className={`w-8 h-8 transition-colors ${
              star <= formData.rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'
            }`}
          >
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {formData.rating > 0 ? `${formData.rating}/5 sao` : 'Chọn số sao'}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Viết đánh giá của bạn
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Đánh giá tổng quan *
          </label>
          {renderStars()}
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tiêu đề đánh giá
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Tóm tắt ngắn gọn về trải nghiệm của bạn..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={100}
          />
          <div className="mt-1 text-xs text-gray-500 text-right">
            {formData.title.length}/100
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nội dung đánh giá *
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            placeholder="Chia sẻ chi tiết về trải nghiệm sử dụng sản phẩm..."
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={1000}
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>Tối thiểu 10 ký tự</span>
            <span>{formData.content.length}/1000</span>
          </div>
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content}</p>
          )}
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hình ảnh (tùy chọn)
          </label>
          <div className="space-y-3">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="review-images"
              max={5}
            />
            <label
              htmlFor="review-images"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Thêm hình ảnh
            </label>
            <p className="text-xs text-gray-500">
              Tối đa 5 ảnh, mỗi ảnh không quá 5MB
            </p>
            
            {/* Image Preview */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-20 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {errors.images && (
              <p className="text-sm text-red-600">{errors.images}</p>
            )}
          </div>
        </div>

        {/* Error Message */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3 pt-4 border-t">
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            className="flex-1"
          >
            {loading ? 'Đang gửi...' : 'Gửi đánh giá'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            Hủy
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;