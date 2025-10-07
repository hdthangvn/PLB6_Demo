// Mock data để thay thế cho hardcode - sẽ thay bằng API calls sau
export const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: 'iPhone 17 Pro',
    subtitle: 'Bù thấy it. Đối thấy nhanh.',
    description: 'Tổng ưu đãi đến 7 Triệu',
    price: '30.99 Triệu',
    installment: 'Trả góp 0% đến 12 Tháng',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=400&fit=crop',
    category: 'smartphone'
  },
  {
    id: 2,
    name: 'MacBook Pro M4',
    subtitle: 'Siêu mạnh. Siêu nhanh.',
    description: 'Ưu đãi đặc biệt cho sinh viên',
    price: '45.99 Triệu',
    installment: 'Trả góp 0% đến 24 Tháng',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=400&fit=crop',
    category: 'laptop'
  },
  {
    id: 3,
    name: 'Gaming Setup Pro',
    subtitle: 'Game thả ga. Chiến không giới hạn.',
    description: 'Combo PC + Monitor + Gear',
    price: '89.99 Triệu',
    installment: 'Trả góp 0% đến 36 Tháng',
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&h=400&fit=crop',
    category: 'pc'
  },
  {
    id: 4,
    name: 'iPad Pro M4',
    subtitle: 'Sáng tạo không giới hạn.',
    description: 'Hoàn hảo cho designer & artist',
    price: '28.99 Triệu',
    installment: 'Trả góp 0% đến 18 Tháng',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=400&fit=crop',
    category: 'tablet'
  },
  {
    id: 5,
    name: 'Samsung Galaxy S25 Ultra',
    subtitle: 'AI Camera. Siêu zoom 200MP.',
    description: 'Chụp ảnh professional',
    price: '32.99 Triệu',
    installment: 'Trả góp 0% đến 20 Tháng',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=400&fit=crop',
    category: 'smartphone'
  },
  {
    id: 6,
    name: 'ASUS ROG Zephyrus',
    subtitle: 'Gaming laptop mỏng nhất.',
    description: 'RTX 5080 + Ryzen 9000',
    price: '65.99 Triệu',
    installment: 'Trả góp 0% đến 30 Tháng',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=400&fit=crop',
    category: 'laptop'
  },
  {
    id: 7,
    name: 'Apple Watch Ultra 3',
    subtitle: 'Adventure đỉnh cao.',
    description: 'Pin 3 ngày + GPS chính xác',
    price: '18.99 Triệu',
    installment: 'Trả góp 0% đến 15 Tháng',
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&h=400&fit=crop',
    category: 'wearable'
  },
  {
    id: 8,
    name: 'Sony WH-1000XM6',
    subtitle: 'Chống ồn AI thế hệ mới.',
    description: 'Audio chất lượng studio',
    price: '9.99 Triệu',
    installment: 'Trả góp 0% đến 10 Tháng',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=400&fit=crop',
    category: 'audio'
  },
  {
    id: 9,
    name: 'MSI Titan 18 HX',
    subtitle: 'Workstation di động.',
    description: 'Core i9 + RTX 5090 Mobile',
    price: '125.99 Triệu',
    installment: 'Trả góp 0% đến 48 Tháng',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=400&fit=crop',
    category: 'laptop'
  },
  {
    id: 10,
    name: 'Google Pixel 9 Pro',
    subtitle: 'AI Photography Master.',
    description: 'Magic Eraser + Night Sight',
    price: '24.99 Triệu',
    installment: 'Trả góp 0% đến 16 Tháng',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=400&fit=crop',
    category: 'smartphone'
  }
];

export const CATEGORIES = [
  { name: 'Điện thoại, Tablet', icon: '📱', key: 'smartphones' }, // ✅ key: 'smartphones'
  { name: 'Laptop', icon: '💻', key: 'laptops' }, // ✅ key: 'laptops'
  { name: 'Âm thanh, Mic thu âm', icon: '🎧', key: 'audio' },
  { name: 'Đồng hồ, Camera', icon: '📷', key: 'camera' },
  { name: 'Đồ gia dụng', icon: '🏠', key: 'home' },
  { name: 'Phụ kiện', icon: '🔌', key: 'accessories' },
  { name: 'PC, Màn hình, Máy in', icon: '🖥️', key: 'pc' },
  { name: 'Tivi', icon: '📺', key: 'tv' }
];

export const PRODUCT_LISTS = {
  featured: [
    {
      id: 101,
      name: 'MacBook Air M2',
      price: '28.990.000',
      originalPrice: '32.990.000',
      image: '💻',
      badge: 'Giảm 12%',
      category: 'laptop'
    },
    {
      id: 102,
      name: 'iPhone 15 Pro Max',
      price: '29.990.000',
      originalPrice: '34.990.000',
      image: '📱',
      badge: 'Mới nhất',
      category: 'smartphone'
    },
    {
      id: 103,
      name: 'ASUS ROG RTX 4080',
      price: '24.990.000',
      originalPrice: '28.990.000',
      image: '🎮',
      badge: 'Gaming',
      category: 'pc'
    },
    {
      id: 104,
      name: 'Sony WH-1000XM5',
      price: '6.990.000',
      originalPrice: '8.990.000',
      image: '🎧',
      badge: 'Bestseller',
      category: 'audio'
    },
    {
      id: 105,
      name: 'iPad Pro M4',
      price: '25.990.000',
      originalPrice: '29.990.000',
      image: '📱',
      badge: 'Hot',
      category: 'tablet'
    },
    {
      id: 106,
      name: 'Dell XPS 13 Plus',
      price: '35.990.000',
      originalPrice: '39.990.000',
      image: '💻',
      badge: 'Premium',
      category: 'laptop'
    },
    {
      id: 107,
      name: 'Samsung Galaxy Watch6',
      price: '7.990.000',
      originalPrice: '9.990.000',
      image: '⌚',
      badge: 'Smart',
      category: 'wearable'
    },
    {
      id: 108,
      name: 'Canon EOS R8',
      price: '42.990.000',
      originalPrice: '49.990.000',
      image: '📷',
      badge: 'Pro',
      category: 'camera'
    }
  ],
  
  laptops: [
    {
      id: 201,
      name: 'MacBook Pro M4',
      price: '45.990.000',
      originalPrice: '49.990.000',
      image: '💻',
      badge: 'Mới nhất',
      category: 'laptop'
    },
    {
      id: 202,
      name: 'Dell XPS 13',
      price: '32.990.000',
      originalPrice: '36.990.000',
      image: '💻',
      badge: 'Giảm 11%',
      category: 'laptop'
    },
    {
      id: 203,
      name: 'ASUS ROG Zephyrus',
      price: '38.990.000',
      originalPrice: '42.990.000',
      image: '💻',
      badge: 'Gaming',
      category: 'laptop'
    },
    {
      id: 204,
      name: 'HP Spectre x360',
      price: '29.990.000',
      originalPrice: '33.990.000',
      image: '💻',
      badge: 'Hot',
      category: 'laptop'
    },
    {
      id: 205,
      name: 'Lenovo ThinkPad X1',
      price: '35.990.000',
      originalPrice: '39.990.000',
      image: '💻',
      badge: 'Doanh nhân',
      category: 'laptop'
    },
    {
      id: 206,
      name: 'MSI Creator Z17',
      price: '55.990.000',
      originalPrice: '62.990.000',
      image: '💻',
      badge: 'Creator',
      category: 'laptop'
    },
    {
      id: 207,
      name: 'Surface Laptop 6',
      price: '27.990.000',
      originalPrice: '31.990.000',
      image: '💻',
      badge: 'Microsoft',
      category: 'laptop'
    },
    {
      id: 208,
      name: 'Acer Predator Helios',
      price: '43.990.000',
      originalPrice: '48.990.000',
      image: '💻',
      badge: 'Gaming',
      category: 'laptop'
    },
    {
      id: 209,
      name: 'LG Gram 17',
      price: '33.990.000',
      originalPrice: '37.990.000',
      image: '💻',
      badge: 'Ultralight',
      category: 'laptop'
    },
    {
      id: 210,
      name: 'ASUS Zenbook Pro',
      price: '41.990.000',
      originalPrice: '46.990.000',
      image: '💻',
      badge: 'OLED',
      category: 'laptop'
    },
    {
      id: 211,
      name: 'MacBook Air M3',
      price: '26.990.000',
      originalPrice: '29.990.000',
      image: '💻',
      badge: 'Phổ biến',
      category: 'laptop'
    },
    {
      id: 212,
      name: 'Razer Blade 15',
      price: '52.990.000',
      originalPrice: '58.990.000',
      image: '💻',
      badge: 'Pro Gaming',
      category: 'laptop'
    }
  ],

  smartphones: [
    {
      id: 301,
      name: 'iPhone 15 Pro',
      price: '24.990.000',
      originalPrice: '28.990.000',
      image: '📱',
      badge: 'Hot',
      category: 'smartphone'
    },
    {
      id: 302,
      name: 'Samsung Galaxy S24',
      price: '18.990.000',
      originalPrice: '22.990.000',
      image: '📱',
      badge: 'Giảm 17%',
      category: 'smartphone'
    },
    {
      id: 303,
      name: 'Xiaomi 14 Pro',
      price: '16.990.000',
      originalPrice: '19.990.000',
      image: '📱',
      badge: 'Mới nhất',
      category: 'smartphone'
    },
    {
      id: 304,
      name: 'Google Pixel 8',
      price: '15.990.000',
      originalPrice: '18.990.000',
      image: '📱',
      badge: 'AI',
      category: 'smartphone'
    },
    {
      id: 305,
      name: 'OnePlus 12',
      price: '17.990.000',
      originalPrice: '20.990.000',
      image: '📱',
      badge: 'Fast Charge',
      category: 'smartphone'
    },
    {
      id: 306,
      name: 'iPhone 14 Plus',
      price: '21.990.000',
      originalPrice: '25.990.000',
      image: '📱',
      badge: 'Large Screen',
      category: 'smartphone'
    },
    {
      id: 307,
      name: 'Samsung Galaxy Z Fold6',
      price: '42.990.000',
      originalPrice: '47.990.000',
      image: '📱',
      badge: 'Foldable',
      category: 'smartphone'
    },
    {
      id: 308,
      name: 'Xiaomi 14 Ultra',
      price: '22.990.000',
      originalPrice: '26.990.000',
      image: '📱',
      badge: 'Camera Pro',
      category: 'smartphone'
    },
    {
      id: 309,
      name: 'OPPO Find X7 Pro',
      price: '19.990.000',
      originalPrice: '23.990.000',
      image: '📱',
      badge: 'Portrait Master',
      category: 'smartphone'
    },
    {
      id: 310,
      name: 'Vivo X100 Pro',
      price: '18.990.000',
      originalPrice: '21.990.000',
      image: '📱',
      badge: 'Zeiss Lens',
      category: 'smartphone'
    },
    {
      id: 311,
      name: 'Nothing Phone (2a)',
      price: '8.990.000',
      originalPrice: '10.990.000',
      image: '📱',
      badge: 'Unique Design',
      category: 'smartphone'
    },
    {
      id: 312,
      name: 'Realme GT 6',
      price: '12.990.000',
      originalPrice: '15.990.000',
      image: '📱',
      badge: 'Performance',
      category: 'smartphone'
    }
  ],

  // THÊM DANH MỤC MỚI
  audio: [
    {
      id: 401,
      name: 'Sony WH-1000XM5',
      price: '6.990.000',
      originalPrice: '8.990.000',
      image: '🎧',
      badge: 'Bestseller',
      category: 'audio'
    },
    {
      id: 402,
      name: 'AirPods Pro 2',
      price: '5.990.000',
      originalPrice: '6.990.000',
      image: '🎧',
      badge: 'Apple',
      category: 'audio'
    },
    {
      id: 403,
      name: 'Bose QuietComfort Ultra',
      price: '8.990.000',
      originalPrice: '10.990.000',
      image: '🎧',
      badge: 'Premium',
      category: 'audio'
    },
    {
      id: 404,
      name: 'Sennheiser Momentum 4',
      price: '7.990.000',
      originalPrice: '9.990.000',
      image: '🎧',
      badge: 'Audiophile',
      category: 'audio'
    },
    {
      id: 405,
      name: 'Marshall Major IV',
      price: '3.990.000',
      originalPrice: '4.990.000',
      image: '🎧',
      badge: 'Classic',
      category: 'audio'
    },
    {
      id: 406,
      name: 'JBL Tour One M2',
      price: '4.990.000',
      originalPrice: '6.990.000',
      image: '🎧',
      badge: 'Wireless',
      category: 'audio'
    }
  ],

  camera: [
    {
      id: 501,
      name: 'Canon EOS R8',
      price: '42.990.000',
      originalPrice: '49.990.000',
      image: '📷',
      badge: 'Mirrorless',
      category: 'camera'
    },
    {
      id: 502,
      name: 'Sony A7 IV',
      price: '51.990.000',
      originalPrice: '58.990.000',
      image: '📷',
      badge: 'Full Frame',
      category: 'camera'
    },
    {
      id: 503,
      name: 'Fujifilm X-T5',
      price: '38.990.000',
      originalPrice: '43.990.000',
      image: '📷',
      badge: 'Retro Style',
      category: 'camera'
    },
    {
      id: 504,
      name: 'Nikon Z6 III',
      price: '47.990.000',
      originalPrice: '52.990.000',
      image: '📷',
      badge: 'Video Pro',
      category: 'camera'
    },
    {
      id: 505,
      name: 'Canon EOS R10',
      price: '22.990.000',
      originalPrice: '26.990.000',
      image: '📷',
      badge: 'Entry Level',
      category: 'camera'
    },
    {
      id: 506,
      name: 'GoPro Hero 12',
      price: '9.990.000',
      originalPrice: '12.990.000',
      image: '📷',
      badge: 'Action Cam',
      category: 'camera'
    }
  ],

  tv: [
    {
      id: 601,
      name: 'Samsung Neo QLED 8K 65"',
      price: '49.990.000',
      originalPrice: '59.990.000',
      image: '📺',
      badge: '8K',
      category: 'tv'
    },
    {
      id: 602,
      name: 'LG OLED C4 55"',
      price: '32.990.000',
      originalPrice: '39.990.000',
      image: '📺',
      badge: 'OLED',
      category: 'tv'
    },
    {
      id: 603,
      name: 'Sony Bravia XR A95L 65"',
      price: '65.990.000',
      originalPrice: '75.990.000',
      image: '📺',
      badge: 'Premium',
      category: 'tv'
    },
    {
      id: 604,
      name: 'TCL C845 QLED 75"',
      price: '25.990.000',
      originalPrice: '32.990.000',
      image: '📺',
      badge: 'Large Screen',
      category: 'tv'
    },
    {
      id: 605,
      name: 'Xiaomi TV A Pro 43"',
      price: '6.990.000',
      originalPrice: '8.990.000',
      image: '📺',
      badge: 'Budget',
      category: 'tv'
    },
    {
      id: 606,
      name: 'Samsung Frame TV 55"',
      price: '28.990.000',
      originalPrice: '34.990.000',
      image: '📺',
      badge: 'Art Mode',
      category: 'tv'
    }
  ],

  pc: [
    {
      id: 701,
      name: 'Gaming PC RTX 4090',
      price: '89.990.000',
      originalPrice: '99.990.000',
      image: '🖥️',
      badge: 'Ultimate',
      category: 'pc'
    },
    {
      id: 702,
      name: 'MacStudio M2 Ultra',
      price: '95.990.000',
      originalPrice: '109.990.000',
      image: '🖥️',
      badge: 'Pro Workstation',
      category: 'pc'
    },
    {
      id: 703,
      name: 'HP Elite Desktop',
      price: '18.990.000',
      originalPrice: '22.990.000',
      image: '🖥️',
      badge: 'Business',
      category: 'pc'
    },
    {
      id: 704,
      name: 'Dell OptiPlex Micro',
      price: '12.990.000',
      originalPrice: '15.990.000',
      image: '🖥️',
      badge: 'Compact',
      category: 'pc'
    },
    {
      id: 705,
      name: 'ASUS ROG Gaming PC',
      price: '45.990.000',
      originalPrice: '52.990.000',
      image: '🖥️',
      badge: 'RTX 4070',
      category: 'pc'
    },
    {
      id: 706,
      name: 'iMac M3 24"',
      price: '32.990.000',
      originalPrice: '36.990.000',
      image: '🖥️',
      badge: 'All-in-One',
      category: 'pc'
    }
  ],

  accessories: [
    {
      id: 801,
      name: 'MagSafe Charger 15W',
      price: '990.000',
      originalPrice: '1.290.000',
      image: '🔌',
      badge: 'Wireless',
      category: 'accessories'
    },
    {
      id: 802,
      name: 'Logitech MX Master 3S',
      price: '2.290.000',
      originalPrice: '2.690.000',
      image: '🖱️',
      badge: 'Pro Mouse',
      category: 'accessories'
    },
    {
      id: 803,
      name: 'Keychron K8 Pro',
      price: '3.990.000',
      originalPrice: '4.590.000',
      image: '⌨️',
      badge: 'Mechanical',
      category: 'accessories'
    },
    {
      id: 804,
      name: 'Anker PowerBank 20000mAh',
      price: '1.290.000',
      originalPrice: '1.590.000',
      image: '🔋',
      badge: 'Fast Charge',
      category: 'accessories'
    },
    {
      id: 805,
      name: 'Belkin USB-C Hub',
      price: '1.990.000',
      originalPrice: '2.490.000',
      image: '🔌',
      badge: '7-in-1',
      category: 'accessories'
    },
    {
      id: 806,
      name: 'Peak Design Tripod',
      price: '8.990.000',
      originalPrice: '10.990.000',
      image: '📐',
      badge: 'Carbon Fiber',
      category: 'accessories'
    }
  ],

  home: [
    {
      id: 901,
      name: 'Dyson V15 Detect',
      price: '18.990.000',
      originalPrice: '22.990.000',
      image: '🧹',
      badge: 'Laser Tech',
      category: 'home'
    },
    {
      id: 902,
      name: 'Xiaomi Robot Vacuum S12',
      price: '6.990.000',
      originalPrice: '8.990.000',
      image: '🤖',
      badge: 'Smart Clean',
      category: 'home'
    },
    {
      id: 903,
      name: 'Philips Air Fryer XXL',
      price: '4.990.000',
      originalPrice: '6.490.000',
      image: '🍳',
      badge: 'Healthy Cook',
      category: 'home'
    },
    {
      id: 904,
      name: 'Sharp Air Purifier',
      price: '7.990.000',
      originalPrice: '9.990.000',
      image: '💨',
      badge: 'PlasmaCluster',
      category: 'home'
    },
    {
      id: 905,
      name: 'Electrolux Microwave',
      price: '3.990.000',
      originalPrice: '4.990.000',
      image: '📦',
      badge: 'Inverter',
      category: 'home'
    },
    {
      id: 906,
      name: 'LG TwinWash Washing Machine',
      price: '25.990.000',
      originalPrice: '31.990.000',
      image: '🧺',
      badge: 'AI DD',
      category: 'home'
    }
  ]
};

// Thêm detailed products cho demo
export const DETAILED_PRODUCTS = {
  1: {
    id: 1,
    name: 'iPhone 17 Pro',
    subtitle: 'Bù thấy it. Đối thấy nhanh.',
    description: 'iPhone 17 Pro mang đến trải nghiệm hoàn toàn mới với chip A18 Pro, camera ProMax và màn hình Super Retina XDR.',
    price: '30.990.000',
    originalPrice: '34.990.000',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=400&fit=crop',
    category: 'smartphone',
    badge: 'Mới nhất',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop'
    ],
    specifications: {
      screen: '6.7" Super Retina XDR',
      chip: 'Apple A18 Pro',
      camera: 'Triple 48MP + 12MP + 12MP',
      battery: '4400 mAh',
      os: 'iOS 18'
    }
  },
  201: {
    id: 201,
    name: 'MacBook Pro M4',
    subtitle: 'Siêu mạnh. Siêu nhanh.',
    description: 'MacBook Pro M4 với chip Apple Silicon mới nhất, màn hình Liquid Retina XDR và hiệu năng vượt trội.',
    price: '45.990.000',
    originalPrice: '49.990.000',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=400&fit=crop',
    category: 'laptop',
    badge: 'Mới nhất',
    specifications: {
      processor: 'Apple M4 Chip',
      memory: '16GB Unified Memory',
      storage: '512GB SSD',
      display: '14" Liquid Retina XDR',
      battery: 'Up to 22 hours'
    }
  },
  301: {
    id: 301,
    name: 'iPhone 15 Pro',
    subtitle: 'Titanium. So strong. So light.',
    description: 'iPhone 15 Pro với thiết kế titanium cao cấp, chip A17 Pro và camera 48MP Pro.',
    price: '24.990.000',
    originalPrice: '28.990.000',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=400&fit=crop',
    category: 'smartphone',
    badge: 'Hot',
    specifications: {
      screen: '6.1" Super Retina XDR',
      chip: 'A17 Pro',
      camera: 'Pro camera system 48MP',
      battery: 'Up to 23 hours video',
      material: 'Titanium design'
    }
  }
};