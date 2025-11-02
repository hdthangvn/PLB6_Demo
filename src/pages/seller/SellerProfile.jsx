import React, { useState } from 'react';
import SellerLayout from '../../layouts/SellerLayout';

const SellerProfile = () => {
  const [profile, setProfile] = useState({
    fullName: 'Quang Nguyễn',
    email: 'quangnguyen@email.com',
    phone: '0123456789',
    address: '123 Đường ABC, Phường 1, Quận 1, TP.HCM',
    avatar: null,
    bio: 'Người bán chuyên nghiệp với nhiều năm kinh nghiệm trong lĩnh vực công nghệ',
    socialMedia: {
      facebook: '',
      instagram: '',
      website: ''
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialMediaChange = (platform, value) => {
    setProfile(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  const handleSave = () => {
    console.log('Saving profile:', profile);
    setIsEditing(false);
    alert('Cập nhật thông tin thành công!');
  };

  const handleCancel = () => {
    setProfile({
      fullName: 'Quang Nguyễn',
      email: 'quangnguyen@email.com',
      phone: '0123456789',
      address: '123 Đường ABC, Phường 1, Quận 1, TP.HCM',
      avatar: null,
      bio: 'Người bán chuyên nghiệp với nhiều năm kinh nghiệm trong lĩnh vực công nghệ',
      socialMedia: {
        facebook: '',
        instagram: '',
        website: ''
      }
    });
    setIsEditing(false);
  };

  const tabs = [
    { id: 'info', name: 'Thông tin cá nhân', icon: '👤' },
    { id: 'social', name: 'Mạng xã hội', icon: '📱' },
    { id: 'security', name: 'Bảo mật', icon: '🔒' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div className="space-y-6">
            {/* Avatar Section */}
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-4xl">Q</span>
              </div>
              {isEditing && (
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors">
                  Thay đổi ảnh đại diện
                </button>
              )}
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isEditing 
                      ? 'border-gray-300 focus:border-blue-500' 
                      : 'border-gray-200 bg-gray-50 text-gray-500'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isEditing 
                      ? 'border-gray-300 focus:border-blue-500' 
                      : 'border-gray-200 bg-gray-50 text-gray-500'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isEditing 
                      ? 'border-gray-300 focus:border-blue-500' 
                      : 'border-gray-200 bg-gray-50 text-gray-500'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isEditing 
                      ? 'border-gray-300 focus:border-blue-500' 
                      : 'border-gray-200 bg-gray-50 text-gray-500'
                  }`}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giới thiệu bản thân
                </label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${
                    isEditing 
                      ? 'border-gray-300 focus:border-blue-500' 
                      : 'border-gray-200 bg-gray-50 text-gray-500'
                  }`}
                />
              </div>
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook
                </label>
                <input
                  type="url"
                  value={profile.socialMedia.facebook}
                  onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                  disabled={!isEditing}
                  placeholder="https://facebook.com/yourpage"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isEditing 
                      ? 'border-gray-300 focus:border-blue-500' 
                      : 'border-gray-200 bg-gray-50 text-gray-500'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram
                </label>
                <input
                  type="url"
                  value={profile.socialMedia.instagram}
                  onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                  disabled={!isEditing}
                  placeholder="https://instagram.com/yourpage"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isEditing 
                      ? 'border-gray-300 focus:border-blue-500' 
                      : 'border-gray-200 bg-gray-50 text-gray-500'
                  }`}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website cá nhân
                </label>
                <input
                  type="url"
                  value={profile.socialMedia.website}
                  onChange={(e) => handleSocialMediaChange('website', e.target.value)}
                  disabled={!isEditing}
                  placeholder="https://yourwebsite.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isEditing 
                      ? 'border-gray-300 focus:border-blue-500' 
                      : 'border-gray-200 bg-gray-50 text-gray-500'
                  }`}
                />
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
                <p className="text-sm text-yellow-800">
                  Để thay đổi mật khẩu, vui lòng liên hệ với bộ phận hỗ trợ.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  disabled
                  className="w-full px-4 py-3 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  disabled
                  className="w-full px-4 py-3 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  disabled
                  className="w-full px-4 py-3 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-5"></div>
            <div className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Thông tin cá nhân
                    </h1>
                    <p className="text-gray-600 mt-1">Quản lý thông tin cá nhân của bạn</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                      Chỉnh sửa
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Lưu
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerProfile;