import api from './api';

/**
 * ================================================
 * ADDRESS SERVICE - QUẢN LÝ ĐỊA CHỈ
 * ================================================
 * ✅ Uses centralized api.js for:
 * - Automatic JWT token attachment
 * - Auto-logout on 401 Unauthorized
 * - Unified error handling
 */

// Alias with special error handling for "no address" case
const addressApi = api;

// ===== ADDRESS MANAGEMENT APIs =====

/**
 * API #1: Kiểm tra user đã có địa chỉ chưa
 * GET /api/v1/buyer/address/check
 * @returns {Promise} { hasAddress: boolean }
 */
export const checkHasAddress = async () => {
  try {
    const response = await addressApi.get('/api/v1/buyer/address/check');
    return response.data;
  } catch (error) {
    console.error('Error checking address:', error);
    throw error;
  }
};

/**
 * API #2: Lấy danh sách tất cả địa chỉ của user
 * GET /api/v1/buyer/address
 * @returns {Promise} Array of addresses
 */
export const getUserAddresses = async () => {
  try {
    const response = await addressApi.get('/api/v1/buyer/address');
    console.log('✓ GET /api/v1/buyer/address response:', response.data);
    console.log('✓ Response structure:', JSON.stringify(response.data, null, 2));
    if (response.data && response.data.data) {
      console.log('✓ Addresses array:', response.data.data);
      console.log('✓ First address structure:', response.data.data[0]);
    }
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching addresses:', error);
    console.error('❌ Error response:', error.response?.data);
    throw error;
  }
};

/**
 * API #3: Tạo địa chỉ giao hàng mới
 * POST /api/v1/buyer/address
 * @param {Object} addressData - Thông tin địa chỉ mới
 * @param {string} addressData.province - Tỉnh/Thành phố
 * @param {string} addressData.ward - Phường/Xã
 * @param {string} addressData.homeAddress - Số nhà, đường
 * @param {string} addressData.suggestedName - Tên gợi ý (VD: "Nhà riêng", "Công ty")
 * @param {string} addressData.phone - Số điện thoại (10 ký tự)
 * @param {boolean} addressData.default - Đặt làm địa chỉ mặc định
 * @returns {Promise} Created address
 */
export const createAddress = async (addressData) => {
  try {
    // Validate phone number
    if (addressData.phone && addressData.phone.length !== 10) {
      throw new Error('Số điện thoại phải có đúng 10 ký tự');
    }

    // Theo Swagger/CreateAddressDTO: Backend expect "isDefault" không phải "default"
    const payload = {
      province: addressData.province,
      ward: addressData.ward,
      homeAddress: addressData.homeAddress,
      suggestedName: addressData.suggestedName || '',
      phone: addressData.phone,
      isDefault: addressData.isDefault || false  // Dùng isDefault theo DTO
    };

    console.log('Sending address data to API:', payload);
    const response = await addressApi.post('/api/v1/buyer/address', payload);
    console.log('API response:', response);
    console.log('API response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating address:', error);
    console.error('Error response:', error.response);
    console.error('Error response data:', error.response?.data);
    throw error;
  }
};

/**
 * API #4: Cập nhật địa chỉ hiện có
 * PUT /api/v1/buyer/address/{addressId}
 * @param {string|number} addressId - ID của địa chỉ (index trong list, bắt đầu từ 0)
 * @param {Object} addressData - Thông tin địa chỉ cập nhật
 * @returns {Promise} Updated address
 */
export const updateAddress = async (addressId, addressData) => {
  try {
    // Validate phone number nếu có
    if (addressData.phone && addressData.phone.length !== 10) {
      throw new Error('Số điện thoại phải có đúng 10 ký tự');
    }

    // Theo Swagger/UpdateAddressDTO: Backend expect "isDefault"
    const payload = {
      province: addressData.province,
      ward: addressData.ward,
      homeAddress: addressData.homeAddress,
      suggestedName: addressData.suggestedName || '',
      phone: addressData.phone,
      isDefault: addressData.isDefault || false  // Dùng isDefault theo DTO
    };

    const response = await addressApi.put(
      `/api/v1/buyer/address/${addressId}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error('Error updating address:', error);
    throw error;
  }
};

/**
 * API #5: Xóa địa chỉ
 * DELETE /api/v1/buyer/address/{addressId}
 * @param {string|number} addressId - ID của địa chỉ (index trong list, bắt đầu từ 0)
 * @returns {Promise} Success message
 */
export const deleteAddress = async (addressId) => {
  try {
    const response = await addressApi.delete(`/api/v1/buyer/address/${addressId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting address:', error);
    throw error;
  }
};

// ===== HELPER FUNCTIONS =====

/**
 * Format địa chỉ thành chuỗi đầy đủ
 * @param {Object} address - Address object
 * @returns {string} Full address string
 */
export const formatFullAddress = (address) => {
  if (!address) return '';
  
  const parts = [
    address.homeAddress,
    address.ward,
    address.province,
  ].filter(Boolean);
  
  return parts.join(', ');
};

/**
 * Validate address data trước khi gửi API
 * @param {Object} addressData - Address data to validate
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
export const validateAddressData = (addressData) => {
  const errors = [];

  if (!addressData.province || addressData.province.trim() === '') {
    errors.push('Vui lòng nhập Tỉnh/Thành phố');
  }

  if (!addressData.ward || addressData.ward.trim() === '') {
    errors.push('Vui lòng nhập Phường/Xã');
  }

  if (!addressData.homeAddress || addressData.homeAddress.trim() === '') {
    errors.push('Vui lòng nhập số nhà, tên đường');
  }

  if (!addressData.phone || addressData.phone.trim() === '') {
    errors.push('Vui lòng nhập số điện thoại');
  } else if (addressData.phone.length !== 10) {
    errors.push('Số điện thoại phải có đúng 10 ký tự');
  } else if (!/^\d+$/.test(addressData.phone)) {
    errors.push('Số điện thoại chỉ được chứa chữ số');
  }

  if (addressData.province && addressData.province.length > 255) {
    errors.push('Tên tỉnh/thành phố quá dài (tối đa 255 ký tự)');
  }

  if (addressData.ward && addressData.ward.length > 255) {
    errors.push('Tên phường/xã quá dài (tối đa 255 ký tự)');
  }

  if (addressData.homeAddress && addressData.homeAddress.length > 255) {
    errors.push('Địa chỉ chi tiết quá dài (tối đa 255 ký tự)');
  }

  if (addressData.suggestedName && addressData.suggestedName.length > 255) {
    errors.push('Tên gợi ý quá dài (tối đa 255 ký tự)');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export default {
  checkHasAddress,
  getUserAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  formatFullAddress,
  validateAddressData,
};

