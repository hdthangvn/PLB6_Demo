// ✅ Mock data cho B2C Stores với hệ thống Store + Chi nhánh
export const mockStores = [
  {
    id: 'store-1',
    name: 'TechPro Store',
    description: 'Chuỗi cửa hàng công nghệ hàng đầu tại Đà Nẵng - Chuyên cung cấp các sản phẩm công nghệ cao cấp từ Apple, Samsung, Sony và các thương hiệu hàng đầu thế giới.',
    logoUrl: '🏪',
    bannerUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    status: 'APPROVED',
    owner: {
      id: 'owner-1',
      fullName: 'Nguyễn Văn A',
      email: 'owner1@techpro.com',
      phone: '0123456789'
    },
    address: {
      province: 'Đà Nẵng',
      ward: 'Quận Hải Châu',
      homeAddress: '123 Nguyễn Huệ',
      suggestedName: 'TechPro Store - Hải Châu'
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-10-22T15:30:00Z',
    stats: {
      totalProducts: 45,
      totalOrders: 1250,
      averageRating: 4.8,
      totalReviews: 890
    },
    // ✅ Thêm hệ thống chi nhánh
    branches: [
      {
        id: 'branch-1-1',
        name: 'Chi nhánh Hải Châu',
        address: '123 Lê Duẩn, Hải Châu, Đà Nẵng',
        phone: '0236 123 4567',
        email: 'haichau@techpro.com',
        status: 'APPROVED',
        manager: 'Trần Thị B',
        stats: {
          totalProducts: 45,
          totalOrders: 1250,
          averageRating: 4.8,
          totalReviews: 890
        },
        // Mock data cho chi nhánh được duyệt
        products: [
          {
            id: 'P-001',
            name: 'iPhone 15 Pro Max 256GB',
            price: 35000000,
            stock: 25,
            category: 'Điện thoại',
            status: 'ACTIVE',
            images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop&crop=center']
          },
          {
            id: 'P-002',
            name: 'Samsung Galaxy S24 Ultra 512GB',
            price: 32000000,
            stock: 18,
            category: 'Điện thoại',
            status: 'ACTIVE',
            images: ['https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop&crop=center']
          },
          {
            id: 'P-003',
            name: 'MacBook Air M2 256GB',
            price: 28000000,
            stock: 12,
            category: 'Laptop',
            status: 'ACTIVE',
            images: ['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop&crop=center']
          }
        ],
        orders: [
          {
            id: 'ORD-001',
            customerName: 'Nguyễn Văn A',
            totalAmount: 35000000,
            status: 'DELIVERED',
            createdAt: '2024-01-20T10:30:00Z'
          },
          {
            id: 'ORD-002',
            customerName: 'Trần Thị B',
            totalAmount: 32000000,
            status: 'SHIPPING',
            createdAt: '2024-01-21T14:15:00Z'
          }
        ]
      },
      {
        id: 'branch-1-2',
        name: 'Chi nhánh Thanh Khê',
        address: '456 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng',
        phone: '0236 234 5678',
        email: 'thanhkhe@techpro.com',
        status: 'APPROVED',
        manager: 'Lê Văn C',
        stats: {
          totalProducts: 32,
          totalOrders: 890,
          averageRating: 4.6,
          totalReviews: 567
        },
        // Mock data cho chi nhánh được duyệt
        products: [
          {
            id: 'P-004',
            name: 'iPad Pro 11 inch 256GB',
            price: 22000000,
            stock: 15,
            category: 'Tablet',
            status: 'ACTIVE',
            images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop&crop=center']
          },
          {
            id: 'P-005',
            name: 'AirPods Pro 2',
            price: 6500000,
            stock: 30,
            category: 'Phụ kiện',
            status: 'ACTIVE',
            images: ['https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop&crop=center']
          }
        ],
        orders: [
          {
            id: 'ORD-003',
            customerName: 'Lê Văn C',
            totalAmount: 22000000,
            status: 'DELIVERED',
            createdAt: '2024-01-19T09:20:00Z'
          }
        ]
      },
      {
        id: 'branch-1-3',
        name: 'Chi nhánh Sơn Trà',
        address: '789 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng',
        phone: '0236 345 6789',
        email: 'sontra@techpro.com',
        status: 'PENDING',
        manager: 'Phạm Thị D',
        stats: {
          totalProducts: 0,
          totalOrders: 0,
          averageRating: 0,
          totalReviews: 0
        }
      },
      {
        id: 'branch-1-4',
        name: 'Chi nhánh Cẩm Lệ',
        address: '321 Nguyễn Văn Thoại, Cẩm Lệ, Đà Nẵng',
        phone: '0236 456 7890',
        email: 'camle@techpro.com',
        status: 'PENDING',
        manager: 'Hoàng Văn E',
        stats: {
          totalProducts: 0,
          totalOrders: 0,
          averageRating: 0,
          totalReviews: 0
        }
      },
      {
        id: 'branch-1-5',
        name: 'Chi nhánh Ngũ Hành Sơn',
        address: '654 Lê Lợi, Ngũ Hành Sơn, Đà Nẵng',
        phone: '0236 567 8901',
        email: 'nguhanhson@techpro.com',
        status: 'REJECTED',
        manager: 'Vũ Thị F',
        rejectionReason: 'Địa chỉ không phù hợp với quy định',
        stats: {
          totalProducts: 0,
          totalOrders: 0,
          averageRating: 0,
          totalReviews: 0
        }
      }
    ]
  }
];

// ✅ Helper functions
export const getStoreById = (storeId) => {
  return mockStores.find(store => store.id === storeId);
};

export const getBranchById = (storeId, branchId) => {
  const store = getStoreById(storeId);
  return store?.branches?.find(branch => branch.id === branchId);
};

export const getAllBranches = () => {
  return mockStores.flatMap(store => 
    store.branches?.map(branch => ({
      ...branch,
      storeId: store.id,
      storeName: store.name
    })) || []
  );
};

export const getApprovedStores = () => {
  return mockStores.filter(store => store.status === 'APPROVED');
};

export const getApprovedBranches = () => {
  return getAllBranches().filter(branch => branch.status === 'APPROVED');
};