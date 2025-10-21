import { useState, useEffect } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { addressService } from '../../services/addressService';

const PersonalInfoForm = ({ profile, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    province: '',
    ward: '',
    homeAddress: '',
    suggestedName: ''
  });
  const [hasExistingAddress, setHasExistingAddress] = useState(false);
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        phone: profile.phone || '',
        dateOfBirth: profile.dateOfBirth || '',
        gender: profile.gender || '',
        province: profile.address?.province || '',
        ward: profile.address?.ward || '',
        homeAddress: profile.address?.homeAddress || '',
        suggestedName: profile.address?.suggestedName || ''
      });
    }
  }, [profile]);

  // Load address data từ API hoặc localStorage (tối ưu)
  useEffect(() => {
    const loadAddressData = async () => {
      try {
        const result = await addressService.getUserAddress();
        if (result.success && result.data?.address) {
          const addressData = result.data.address;
          
          setFormData(prev => ({
            ...prev,
            province: addressData.province || '',
            ward: addressData.ward || '',
            homeAddress: addressData.homeAddress || '',
            suggestedName: addressData.suggestedName || ''
          }));
          
          // Cập nhật localStorage
          localStorage.setItem('userAddress', JSON.stringify(addressData));
          setHasExistingAddress(true); // Đã có địa chỉ từ API
          return;
        }
      } catch (error) {
        console.log('API lỗi, load từ localStorage');
      }
      
      // Load từ localStorage nếu API lỗi
      const savedAddress = localStorage.getItem('userAddress');
      if (savedAddress) {
        try {
          const addressData = JSON.parse(savedAddress);
          setFormData(prev => ({
            ...prev,
            province: addressData.province || '',
            ward: addressData.ward || '',
            homeAddress: addressData.homeAddress || '',
            suggestedName: addressData.suggestedName || ''
          }));
          setHasExistingAddress(true); // Đã có địa chỉ từ localStorage
        } catch (parseError) {
          console.log('Lỗi parse localStorage');
          setHasExistingAddress(false); // Lỗi parse, không có địa chỉ
        }
      } else {
        setHasExistingAddress(false); // Không có địa chỉ trong localStorage
      }
    };
    
    loadAddressData();
  }, []);

  const handleDeleteAddress = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa địa chỉ này?')) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await addressService.deleteAddress();
      
      if (result.success) {
        // Xóa dữ liệu khỏi form
        setFormData(prev => ({
          ...prev,
          province: '',
          ward: '',
          homeAddress: '',
          suggestedName: ''
        }));
        
        // Xóa khỏi localStorage
        localStorage.removeItem('userAddress');
        
        // Hiển thị thông báo thành công
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300';
        notification.textContent = 'Xóa địa chỉ thành công!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.classList.add('opacity-0', 'translate-x-full');
          setTimeout(() => {
            if (notification.parentNode) {
              notification.parentNode.removeChild(notification);
            }
          }, 300);
        }, 3000);
      } else {
        setErrors({ submit: result.error || 'Xóa địa chỉ thất bại' });
      }
    } catch (error) {
      setErrors({ submit: error.message || 'Có lỗi xảy ra khi xóa địa chỉ' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Tên là bắt buộc';
    }
    
    if (formData.phone && !/^\d{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    // Validate address fields theo backend
    if (formData.province && !formData.ward) {
      newErrors.ward = 'Phường/Xã là bắt buộc khi có Tỉnh/Thành phố';
    }
    
    if (formData.province && !formData.homeAddress) {
      newErrors.homeAddress = 'Địa chỉ chi tiết là bắt buộc khi có Tỉnh/Thành phố';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Update profile info (nếu có API)
      let profileResult = { success: true };
      if (onSubmit) {
        profileResult = await onSubmit({
          name: formData.name,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender
        });
      }

      // Update address via API theo logic backend
      let addressResult = { success: true };
      if (formData.province || formData.ward || formData.homeAddress || formData.suggestedName) {
        const addressData = {
          province: formData.province,
          ward: formData.ward,
          homeAddress: formData.homeAddress,
          suggestedName: formData.suggestedName
        };
        
        addressResult = await addressService.createOrUpdateAddress(addressData);
        
        // Chỉ cập nhật hasExistingAddress và localStorage khi POST thành công
        if (addressResult.success) {
          setHasExistingAddress(true);
          localStorage.setItem('userAddress', JSON.stringify(addressData));
        }
      }

      if (profileResult.success && addressResult.success) {
        // Cập nhật UI với dữ liệu đã gửi (vì backend trả về data rỗng)
        if (formData.province || formData.ward || formData.homeAddress || formData.suggestedName) {
          setFormData(prev => ({
            ...prev,
            province: formData.province,
            ward: formData.ward,
            homeAddress: formData.homeAddress,
            suggestedName: formData.suggestedName
          }));
        }
        
        // Show success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300';
        notification.textContent = 'Cập nhật thông tin thành công!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.classList.add('opacity-0', 'translate-x-full');
          setTimeout(() => {
            if (notification.parentNode) {
              notification.parentNode.removeChild(notification);
            }
          }, 300);
        }, 3000);
      } else {
        setErrors({ submit: addressResult.error || profileResult.error || 'Cập nhật thất bại' });
      }
    } catch (error) {
      setErrors({ submit: error.message || 'Có lỗi xảy ra' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 rounded-2xl shadow-xl border border-gray-100/50 p-8 backdrop-blur-sm">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Thông tin cá nhân
        </h2>
      </div>
      
      {errors.submit && (
        <div className="mb-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl text-sm font-medium shadow-sm">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.submit}
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            name="name"
            type="text"
            label="Họ và tên *"
            placeholder="Nhập họ và tên"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            disabled={isSubmitting}
          />
          
          <Input
            name="phone"
            type="tel"
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày sinh
            </label>
            <input
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              disabled={isSubmitting}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giới tính
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={isSubmitting}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
        </div>

        {/* Address Fields theo logic backend */}
        <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/30 rounded-2xl p-6 border border-blue-100/50">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Địa chỉ</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              name="province"
              type="text"
              label="Tỉnh/Thành phố"
              placeholder="Nhập tỉnh/thành phố"
              value={formData.province}
              onChange={handleChange}
              error={errors.province}
              disabled={isSubmitting}
            />
            
            <Input
              name="ward"
              type="text"
              label="Phường/Xã"
              placeholder="Nhập phường/xã"
              value={formData.ward}
              onChange={handleChange}
              error={errors.ward}
              disabled={isSubmitting}
            />
          </div>

          <Input
            name="homeAddress"
            type="text"
            label="Địa chỉ chi tiết"
            placeholder="Nhập địa chỉ chi tiết"
            value={formData.homeAddress}
            onChange={handleChange}
            error={errors.homeAddress}
            disabled={isSubmitting}
          />

          <Input
            name="suggestedName"
            type="text"
            label="Tên gợi ý"
            placeholder="Ví dụ: Nhà riêng, Công ty..."
            value={formData.suggestedName}
            onChange={handleChange}
            error={errors.suggestedName}
            disabled={isSubmitting}
          />
          
          {/* Nút xóa địa chỉ */}
          {hasExistingAddress && (
            <div className="mt-6 flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={handleDeleteAddress}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200 text-red-600 hover:from-red-100 hover:to-pink-100 hover:border-red-300 transition-all duration-200 shadow-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {isSubmitting ? 'Đang xóa...' : 'Xóa địa chỉ'}
              </Button>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-6">
          <Button
            type="submit"
            loading={isSubmitting}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Lưu thay đổi
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;