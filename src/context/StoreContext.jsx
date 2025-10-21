import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStoreContext must be used within a StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ children }) => {
  const [userStores, setUserStores] = useState([]);
  const [currentStore, setCurrentStore] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data - sẽ thay thế bằng API call
  const mockStores = [
    {
      id: 'branch-1',
      name: 'TechPro Store',
      branchName: 'Chi nhánh Hải Châu',
      description: 'Cửa hàng chính tại Hải Châu, Đà Nẵng - Chuyên bán điện thoại cao cấp và phụ kiện',
      address: '123 Lê Duẩn, Hải Châu, Đà Nẵng',
      phone: '0236 123 4567',
      email: 'haichau@techpro.com',
      status: 'APPROVED',
      logoUrl: null,
      bannerUrl: null,
      createdAt: '2024-01-15T10:30:00Z',
      stats: {
        products: 45,
        orders: 156,
        revenue: 2500000000,
        rating: 4.9,
        customers: 89
      }
    },
    {
      id: 'branch-2',
      name: 'TechPro Store',
      branchName: 'Chi nhánh Thanh Khê',
      description: 'Cửa hàng tại Thanh Khê, Đà Nẵng - Chuyên bán laptop gaming và thiết bị văn phòng',
      address: '456 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng',
      phone: '0236 987 6543',
      email: 'thanhkhe@techpro.com',
      status: 'APPROVED',
      logoUrl: null,
      bannerUrl: null,
      createdAt: '2024-01-20T14:20:00Z',
      stats: {
        products: 32,
        orders: 89,
        revenue: 1800000000,
        rating: 4.8,
        customers: 67
      }
    },
    {
      id: 'branch-3',
      name: 'TechPro Store',
      branchName: 'Chi nhánh Sơn Trà',
      description: 'Cửa hàng tại Sơn Trà, Đà Nẵng - Chuyên bán đồ gaming và thiết bị âm thanh',
      address: '789 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng',
      status: 'PENDING',
      logoUrl: null,
      bannerUrl: null,
      createdAt: '2024-01-25T09:15:00Z',
      stats: {
        products: 28,
        orders: 0,
        revenue: 0,
        rating: 0,
        customers: 0
      }
    },
    {
      id: 'branch-4',
      name: 'TechPro Store',
      branchName: 'Chi nhánh Cẩm Lệ',
      description: 'Cửa hàng tại Cẩm Lệ, Đà Nẵng - Chuyên bán phụ kiện điện tử',
      address: '321 Nguyễn Văn Thoại, Cẩm Lệ, Đà Nẵng',
      status: 'REJECTED',
      logoUrl: null,
      bannerUrl: null,
      createdAt: '2024-01-30T14:30:00Z',
      stats: {
        products: 0,
        orders: 0,
        revenue: 0,
        rating: 0,
        customers: 0
      }
    },
    {
      id: 'branch-5',
      name: 'TechPro Store',
      branchName: 'Chi nhánh Liên Chiểu',
      description: 'Cửa hàng tại Liên Chiểu, Đà Nẵng - Chuyên bán máy tính và linh kiện',
      address: '654 Điện Biên Phủ, Liên Chiểu, Đà Nẵng',
      status: 'REJECTED',
      logoUrl: null,
      bannerUrl: null,
      createdAt: '2024-02-05T11:45:00Z',
      stats: {
        products: 0,
        orders: 0,
        revenue: 0,
        rating: 0,
        customers: 0
      }
    }
  ];

  useEffect(() => {
    fetchUserStores();
  }, []);

  const fetchUserStores = async () => {
    try {
      setLoading(true);
      // TODO: Call API GET /b2c/stores/my-stores
      // const response = await fetch('/api/b2c/stores/my-stores');
      // const data = await response.json();
      // setUserStores(data);
      
      // Mock data for now
      setTimeout(() => {
        setUserStores(mockStores);
        
        // Load selected store from localStorage
        const savedStoreId = localStorage.getItem('selectedStoreId');
        let selectedStore = null;
        
        if (savedStoreId) {
          selectedStore = mockStores.find(store => store.id === savedStoreId);
        }
        
        // If no saved store or saved store not found, use first approved store
        if (!selectedStore) {
          selectedStore = mockStores.find(store => store.status === 'APPROVED');
        }
        
        if (selectedStore) {
          setCurrentStore(selectedStore);
        }
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching user stores:', error);
      setLoading(false);
    }
  };

  const createStore = async (storeData) => {
    try {
      // TODO: Call API POST /b2c/stores/create
      // const response = await fetch('/api/b2c/stores/create', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(storeData)
      // });
      // const newStore = await response.json();
      
      // Mock creation
      const newStore = {
        id: `store-${Date.now()}`,
        ...storeData,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        stats: {
          products: 0,
          orders: 0,
          revenue: 0,
          rating: 0
        }
      };
      
      setUserStores(prev => [...prev, newStore]);
      return newStore;
    } catch (error) {
      console.error('Error creating store:', error);
      throw error;
    }
  };

  const updateStore = async (storeId, storeData) => {
    try {
      // TODO: Call API PUT /b2c/stores/{id}
      // const response = await fetch(`/api/b2c/stores/${storeId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(storeData)
      // });
      // const updatedStore = await response.json();
      
      // Mock update
      const updatedStore = { ...storeData, id: storeId };
      setUserStores(prev => 
        prev.map(store => store.id === storeId ? updatedStore : store)
      );
      
      // Update current store if it's the one being updated
      if (currentStore && currentStore.id === storeId) {
        setCurrentStore(updatedStore);
      }
      
      return updatedStore;
    } catch (error) {
      console.error('Error updating store:', error);
      throw error;
    }
  };

  const selectStore = (storeId) => {
    const store = userStores.find(s => s.id === storeId);
    if (store) {
      setCurrentStore(store);
      // TODO: Save selected store to localStorage or API
      localStorage.setItem('selectedStoreId', storeId);
    }
  };

  const uploadStoreLogo = async (storeId, logoFile) => {
    try {
      // TODO: Call API POST /b2c/stores/{id}/logo
      // const formData = new FormData();
      // formData.append('logo', logoFile);
      // const response = await fetch(`/api/b2c/stores/${storeId}/logo`, {
      //   method: 'POST',
      //   body: formData
      // });
      // const result = await response.json();
      
      // Mock upload
      const logoUrl = URL.createObjectURL(logoFile);
      const updatedStore = { ...currentStore, logoUrl };
      
      setUserStores(prev => 
        prev.map(store => store.id === storeId ? updatedStore : store)
      );
      
      if (currentStore && currentStore.id === storeId) {
        setCurrentStore(updatedStore);
      }
      
      return logoUrl;
    } catch (error) {
      console.error('Error uploading logo:', error);
      throw error;
    }
  };

  const uploadStoreBanner = async (storeId, bannerFile) => {
    try {
      // TODO: Call API POST /b2c/stores/{id}/banner
      // const formData = new FormData();
      // formData.append('banner', bannerFile);
      // const response = await fetch(`/api/b2c/stores/${storeId}/banner`, {
      //   method: 'POST',
      //   body: formData
      // });
      // const result = await response.json();
      
      // Mock upload
      const bannerUrl = URL.createObjectURL(bannerFile);
      const updatedStore = { ...currentStore, bannerUrl };
      
      setUserStores(prev => 
        prev.map(store => store.id === storeId ? updatedStore : store)
      );
      
      if (currentStore && currentStore.id === storeId) {
        setCurrentStore(updatedStore);
      }
      
      return bannerUrl;
    } catch (error) {
      console.error('Error uploading banner:', error);
      throw error;
    }
  };

  const refreshStoreStats = async (storeId) => {
    try {
      // TODO: Call API to get updated stats
      // const response = await fetch(`/api/b2c/analytics/dashboard/${storeId}`);
      // const stats = await response.json();
      
      // Mock refresh
      const updatedStats = {
        products: Math.floor(Math.random() * 100),
        orders: Math.floor(Math.random() * 200),
        revenue: Math.floor(Math.random() * 5000000000),
        rating: 4.5 + Math.random() * 0.5
      };
      
      setUserStores(prev => 
        prev.map(store => 
          store.id === storeId 
            ? { ...store, stats: updatedStats }
            : store
        )
      );
      
      if (currentStore && currentStore.id === storeId) {
        setCurrentStore(prev => ({ ...prev, stats: updatedStats }));
      }
      
      return updatedStats;
    } catch (error) {
      console.error('Error refreshing store stats:', error);
      throw error;
    }
  };

  const value = {
    userStores,
    currentStore,
    loading,
    setCurrentStore,
    selectStore,
    createStore,
    updateStore,
    uploadStoreLogo,
    uploadStoreBanner,
    refreshStoreStats,
    fetchUserStores
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
