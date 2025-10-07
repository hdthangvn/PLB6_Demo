import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const PasswordChangeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Mật khẩu hiện tại là bắt buộc';
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'Mật khẩu mới là bắt buộc';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Mật khẩu mới phải có ít nhất 6 ký tự';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    
    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'Mật khẩu mới phải khác mật khẩu hiện tại';
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
      const result = await onSubmit({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      
      if (result.success) {
        // Reset form
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        
        // Show success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300';
        notification.textContent = result.message;
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
        setErrors({ submit: result.error });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Đổi mật khẩu</h2>
      
      {errors.submit && (
        <div className="mb-4 bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-md text-sm">
          {errors.submit}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
        <Input
          name="currentPassword"
          type="password"
          label="Mật khẩu hiện tại *"
          placeholder="Nhập mật khẩu hiện tại"
          value={formData.currentPassword}
          onChange={handleChange}
          error={errors.currentPassword}
          disabled={isSubmitting}
          showPasswordToggle
        />
        
        <Input
          name="newPassword"
          type="password"
          label="Mật khẩu mới *"
          placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
          value={formData.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
          disabled={isSubmitting}
          showPasswordToggle
        />
        
        <Input
          name="confirmPassword"
          type="password"
          label="Xác nhận mật khẩu mới *"
          placeholder="Nhập lại mật khẩu mới"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          disabled={isSubmitting}
          showPasswordToggle
        />

        {/* Password Requirements */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm">
          <h4 className="font-medium text-blue-900 mb-2">Yêu cầu mật khẩu:</h4>
          <ul className="text-blue-800 space-y-1">
            <li>• Ít nhất 6 ký tự</li>
            <li>• Khác với mật khẩu hiện tại</li>
            <li>• Nên có cả chữ hoa, chữ thường và số</li>
          </ul>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            loading={isSubmitting}
            className="px-8"
          >
            Đổi mật khẩu
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PasswordChangeForm;