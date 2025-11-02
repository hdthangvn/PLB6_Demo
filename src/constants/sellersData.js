// ✅ Mock data cho C2C Sellers (người bán cá nhân)
export const mockSellers = [
  {
    id: 'seller-1',
    name: 'Nguyễn Văn Minh',
    email: 'minh.nguyen@email.com',
    phone: '0123456789',
    avatar: '👨‍💻',
    bio: 'Chuyên bán điện thoại và laptop cũ với giá tốt. Cam kết hàng chính hãng 100%.',
    location: 'Quận Hải Châu, Đà Nẵng',
    joinDate: '2024-01-15T10:00:00Z',
    verified: true,
    stats: {
      totalProducts: 12,
      totalSales: 45,
      averageRating: 4.7,
      totalReviews: 38,
      responseRate: 95,
      responseTime: '2 giờ'
    },
    specialties: ['Điện thoại', 'Laptop', 'Phụ kiện'],
    badges: ['Top Seller', 'Verified', 'Fast Response'],
    socialMedia: {
      facebook: 'https://facebook.com/minh.nguyen',
      zalo: 'minh.nguyen.zalo'
    }
  },
  {
    id: 'seller-2',
    name: 'Trần Thị Lan',
    email: 'lan.tran@email.com',
    phone: '0987654321',
    avatar: '👩‍💼',
    bio: 'Chuyên về đồ công nghệ cao cấp. Có kinh nghiệm 5 năm trong lĩnh vực điện tử.',
    location: 'Quận Thanh Khê, Đà Nẵng',
    joinDate: '2023-11-20T14:30:00Z',
    verified: true,
    stats: {
      totalProducts: 8,
      totalSales: 32,
      averageRating: 4.9,
      totalReviews: 28,
      responseRate: 98,
      responseTime: '1 giờ'
    },
    specialties: ['Gaming', 'Audio', 'Camera'],
    badges: ['Expert', 'Verified', 'Premium'],
    socialMedia: {
      facebook: 'https://facebook.com/lan.tran',
      instagram: '@lan.tran.tech'
    }
  },
  {
    id: 'seller-3',
    name: 'Lê Hoàng Nam',
    email: 'nam.le@email.com',
    phone: '0369258147',
    avatar: '👨‍🔧',
    bio: 'Thợ sửa chữa điện tử chuyên nghiệp. Bán các linh kiện và thiết bị đã qua sử dụng.',
    location: 'Quận Sơn Trà, Đà Nẵng',
    joinDate: '2024-02-10T09:15:00Z',
    verified: false,
    stats: {
      totalProducts: 15,
      totalSales: 28,
      averageRating: 4.5,
      totalReviews: 22,
      responseRate: 85,
      responseTime: '4 giờ'
    },
    specialties: ['Linh kiện', 'Sửa chữa', 'Thiết bị cũ'],
    badges: ['Repair Expert'],
    socialMedia: {
      facebook: 'https://facebook.com/nam.le.repair'
    }
  },
  {
    id: 'seller-4',
    name: 'Phạm Thị Hoa',
    email: 'hoa.pham@email.com',
    phone: '0912345678',
    avatar: '👩‍🎨',
    bio: 'Chuyên về phụ kiện công nghệ và đồ handmade. Tạo ra những sản phẩm độc đáo.',
    location: 'Quận Liên Chiểu, Đà Nẵng',
    joinDate: '2024-03-05T16:45:00Z',
    verified: true,
    stats: {
      totalProducts: 6,
      totalSales: 18,
      averageRating: 4.8,
      totalReviews: 15,
      responseRate: 92,
      responseTime: '3 giờ'
    },
    specialties: ['Phụ kiện', 'Handmade', 'Gift'],
    badges: ['Creative', 'Verified', 'New Seller'],
    socialMedia: {
      instagram: '@hoa.pham.creative',
      tiktok: '@hoa.pham.tech'
    }
  },
  {
    id: 'seller-5',
    name: 'Hoàng Văn Đức',
    email: 'duc.hoang@email.com',
    phone: '0945678901',
    avatar: '👨‍💼',
    bio: 'Nhà phân phối thiết bị văn phòng và đồ công nghệ. Giá cả cạnh tranh nhất thị trường.',
    location: 'Quận Cẩm Lệ, Đà Nẵng',
    joinDate: '2023-09-12T11:20:00Z',
    verified: true,
    stats: {
      totalProducts: 25,
      totalSales: 78,
      averageRating: 4.6,
      totalReviews: 65,
      responseRate: 96,
      responseTime: '1 giờ'
    },
    specialties: ['Văn phòng', 'Bulk Sales', 'Wholesale'],
    badges: ['Top Seller', 'Verified', 'Bulk Seller'],
    socialMedia: {
      facebook: 'https://facebook.com/duc.hoang.office',
      website: 'https://duc-hoang-tech.com'
    }
  },
  {
    id: 'seller-6',
    name: 'Vũ Thị Mai',
    email: 'mai.vu@email.com',
    phone: '0978901234',
    avatar: '👩‍💻',
    bio: 'Sinh viên IT bán đồ công nghệ để trang trải học phí. Hàng chất lượng tốt với giá sinh viên.',
    location: 'Quận Ngũ Hành Sơn, Đà Nẵng',
    joinDate: '2024-04-18T13:10:00Z',
    verified: false,
    stats: {
      totalProducts: 4,
      totalSales: 12,
      averageRating: 4.9,
      totalReviews: 10,
      responseRate: 88,
      responseTime: '6 giờ'
    },
    specialties: ['Student Price', 'Gaming', 'Laptop'],
    badges: ['Student Seller', 'Budget Friendly'],
    socialMedia: {
      facebook: 'https://facebook.com/mai.vu.student'
    }
  }
];

// ✅ Helper functions
export const getSellerById = (sellerId) => {
  return mockSellers.find(seller => seller.id === sellerId);
};

export const getVerifiedSellers = () => {
  return mockSellers.filter(seller => seller.verified);
};

export const getSellersBySpecialty = (specialty) => {
  return mockSellers.filter(seller => 
    seller.specialties.some(s => s.toLowerCase().includes(specialty.toLowerCase()))
  );
};

export const getTopSellers = (limit = 5) => {
  return mockSellers
    .sort((a, b) => b.stats.totalSales - a.stats.totalSales)
    .slice(0, limit);
};

export const getSellersByLocation = (location) => {
  return mockSellers.filter(seller => 
    seller.location.toLowerCase().includes(location.toLowerCase())
  );
};

// ✅ Seller status helpers
export const getSellerStatus = (seller) => {
  if (seller.stats.totalSales >= 50) return 'Top Seller';
  if (seller.stats.totalSales >= 20) return 'Active Seller';
  if (seller.stats.totalSales >= 5) return 'New Seller';
  return 'Beginner';
};

export const getSellerStatusColor = (status) => {
  switch (status) {
    case 'Top Seller': return 'bg-purple-100 text-purple-800';
    case 'Active Seller': return 'bg-green-100 text-green-800';
    case 'New Seller': return 'bg-blue-100 text-blue-800';
    case 'Beginner': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
