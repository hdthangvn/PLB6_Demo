import { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

const RegisterForm = ({ onSwitchToLogin }) => {
  const { register } = useAuth();
  const { success: showSuccessToast, error: showErrorToast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Họ tên là bắt buộc';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
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
    
    setLoading(true);
    setErrors({});
    setSuccessMessage('');
    
    const result = await register(formData);
    
    if (result.success) {
      // ✅ Thành công → Hiển thị thông báo verify email
      const message = result.message || 'Đăng ký thành công! Vui lòng kiểm tra email để xác minh.';
      setSuccessMessage(message);
      showSuccessToast(message);
      // Reset form
      setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
    } else {
      // ❌ Thất bại → Hiển thị lỗi
      const errorMessage = result.error || 'Đăng ký thất bại';
      setErrors({ general: errorMessage });
      showErrorToast(errorMessage);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Tạo tài khoản mới
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Hoặc{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              đăng nhập với tài khoản có sẵn
            </button>
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 bg-green-50 border border-green-300 text-green-800 px-4 py-3 rounded-md text-sm">
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {errors.general && (
            <div className="mb-4 bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-md text-sm">
              {errors.general}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              name="fullName"
              type="text"
              label="Họ và tên"
              placeholder="Nhập họ và tên"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              disabled={loading}
            />

            <Input
              name="email"
              type="email"
              label="Email"
              placeholder="Nhập email của bạn"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              disabled={loading}
            />

            <Input
              name="password"
              type="password"
              label="Mật khẩu"
              placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              disabled={loading}
              showPasswordToggle
            />

            <Input
              name="confirmPassword"
              type="password"
              label="Xác nhận mật khẩu"
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              disabled={loading}
              showPasswordToggle
            />

            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
                Tôi đồng ý với{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Điều khoản sử dụng
                </a>{' '}
                và{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Chính sách bảo mật
                </a>
              </label>
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full"
            >
              Tạo tài khoản
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;