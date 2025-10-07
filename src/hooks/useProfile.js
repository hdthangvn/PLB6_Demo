import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { useAuth } from '../context/AuthContext';

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Fetch user profile
  const fetchProfile = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const result = await userService.getUserProfile(user.id);
      if (result.success) {
        setProfile(result.data);
      } else {
        setError('Không thể tải thông tin profile');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (profileData) => {
    if (!user?.id) return { success: false, error: 'User not found' };
    
    try {
      setUpdating(true);
      setError(null);
      
      const result = await userService.updateUserProfile(user.id, profileData);
      if (result.success) {
        setProfile(result.data);
        return { success: true, message: 'Cập nhật profile thành công' };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setUpdating(false);
    }
  };

  // Change password
  const changePassword = async (passwordData) => {
    if (!user?.id) return { success: false, error: 'User not found' };
    
    try {
      setUpdating(true);
      const result = await userService.changePassword(user.id, passwordData);
      return result;
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setUpdating(false);
    }
  };

  // Upload avatar
  const uploadAvatar = async (file) => {
    if (!user?.id) return { success: false, error: 'User not found' };
    
    try {
      setUpdating(true);
      const result = await userService.uploadAvatar(user.id, file);
      if (result.success) {
        setProfile(prev => ({ ...prev, avatar: result.data.avatarUrl }));
        return { success: true, avatarUrl: result.data.avatarUrl };
      }
      return result;
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setUpdating(false);
    }
  };

  // Fetch order history
  const fetchOrderHistory = async () => {
    if (!user?.id) return;
    
    try {
      const result = await userService.getOrderHistory(user.id);
      if (result.success) {
        setOrderHistory(result.data);
      }
    } catch (err) {
      console.error('Error fetching order history:', err);
    }
  };

  // Load profile on component mount
  useEffect(() => {
    fetchProfile();
    fetchOrderHistory();
  }, [user?.id]);

  return {
    profile,
    orderHistory,
    loading,
    error,
    updating,
    updateProfile,
    changePassword,
    uploadAvatar,
    refetchProfile: fetchProfile,
    refetchOrderHistory: fetchOrderHistory
  };
};