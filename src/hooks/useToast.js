import { useState, useCallback } from 'react';

export const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((type, message, duration = 3000) => {
    setToast({ type, message, duration });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return {
    toast,
    showToast,
    hideToast,
    // Convenience methods
    success: useCallback((message, duration) => showToast('success', message, duration), [showToast]),
    error: useCallback((message, duration) => showToast('error', message, duration), [showToast]),
    warning: useCallback((message, duration) => showToast('warning', message, duration), [showToast]),
    info: useCallback((message, duration) => showToast('info', message, duration), [showToast])
  };
};

