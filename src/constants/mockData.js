import { getProductImage, getProductGallery, getHeroImage } from '../utils/imageUtils.js';

// Mock data để thay thế cho hardcode - sẽ thay bằng API calls sau
export const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: 'iPhone 17 Pro',
    subtitle: 'Bù thấy it. Đối thấy nhanh.',
    description: 'Tổng ưu đãi đến 7 Triệu',
    price: '30.99 Triệu',
    installment: 'Trả góp 0% đến 12 Tháng',
    image: getHeroImage(1), // ✅ SỬ DỤNG ID SPECIFIC
    category: 'Điện thoại, Tablet',
    categoryKey: 'smartphones'
  },
  {
    id: 2,
    name: 'MacBook Pro M4',
    subtitle: 'Siêu mạnh. Siêu nhanh.',
    description: 'Ưu đãi đặc biệt cho sinh viên',
    price: '45.99 Triệu',
    installment: 'Trả góp 0% đến 24 Tháng',
    image: getHeroImage(2), // ✅ SỬ DỤNG ID SPECIFIC
    category: 'Laptop',
    categoryKey: 'laptops'
  },
  {
    id: 3,
    name: 'Gaming Setup Pro',
    subtitle: 'Game thả ga. Chiến không giới hạn.',
    description: 'Combo PC + Monitor + Gear',
    price: '89.99 Triệu',
    installment: 'Trả góp 0% đến 36 Tháng',
    image: getHeroImage(3), // ✅ SỬ DỤNG ID SPECIFIC
    category: 'PC, Màn hình, Máy in',
    categoryKey: 'pc'
  },
  {
    id: 4,
    name: 'iPad Pro M4',
    subtitle: 'Sáng tạo không giới hạn.',
    description: 'Hoàn hảo cho designer & artist',
    price: '28.99 Triệu',
    installment: 'Trả góp 0% đến 18 Tháng',
    image: getHeroImage(4, 'smartphone'), // ✅ TABLET DỘT SMARTPHONE IMAGES
    category: 'Điện thoại, Tablet',
    categoryKey: 'smartphones'
  },
  {
    id: 5,
    name: 'Samsung Galaxy S25 Ultra',
    subtitle: 'AI Camera. Siêu zoom 200MP.',
    description: 'Chụp ảnh professional',
    price: '32.99 Triệu',
    installment: 'Trả góp 0% đến 20 Tháng',
    image: getHeroImage(5, 'smartphone'), // ✅ SỬ DỤNG HERO IMAGE
    category: 'Điện thoại, Tablet',
    categoryKey: 'smartphones'
  },
  {
    id: 6,
    name: 'ASUS ROG Zephyrus',
    subtitle: 'Gaming laptop mỏng nhất.',
    description: 'RTX 5080 + Ryzen 9000',
    price: '65.99 Triệu',
    installment: 'Trả góp 0% đến 30 Tháng',
    image: getHeroImage(6, 'laptop'), // ✅ SỬ DỤNG HERO IMAGE
    category: 'laptop'
  },
  {
    id: 7,
    name: 'Apple Watch Ultra 3',
    subtitle: 'Adventure đỉnh cao.',
    description: 'Pin 3 ngày + GPS chính xác',
    price: '18.99 Triệu',
    installment: 'Trả góp 0% đến 15 Tháng',
    image: getHeroImage(7, 'accessories'), // ✅ WATCH DỘT ACCESSORIES
    category: 'wearable'
  },
  {
    id: 8,
    name: 'Sony WH-1000XM6',
    subtitle: 'Chống ồn AI thế hệ mới.',
    description: 'Audio chất lượng studio',
    price: '9.99 Triệu',
    installment: 'Trả góp 0% đến 10 Tháng',
    image: getHeroImage(8, 'audio'), // ✅ SỬ DỤNG HERO IMAGE
    category: 'audio'
  },
  {
    id: 9,
    name: 'MSI Titan 18 HX',
    subtitle: 'Workstation di động.',
    description: 'Core i9 + RTX 5090 Mobile',
    price: '125.99 Triệu',
    installment: 'Trả góp 0% đến 48 Tháng',
    image: getHeroImage(9, 'laptop'), // ✅ SỬ DỤNG HERO IMAGE
    category: 'laptop'
  },
  {
    id: 10,
    name: 'Google Pixel 9 Pro',
    subtitle: 'AI Photography Master.',
    description: 'Magic Eraser + Night Sight',
    price: '24.99 Triệu',
    installment: 'Trả góp 0% đến 16 Tháng',
    image: getHeroImage(10, 'smartphone'), // ✅ SỬ DỤNG HERO IMAGE
    category: 'smartphone'
  }
];

export const CATEGORIES = [
  { name: 'Điện thoại, Tablet', icon: '📱', key: 'smartphones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=220&q=80' },
  { name: 'Laptop', icon: '💻', key: 'laptops', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=220&q=80' },
  { name: 'Âm thanh, Mic thu âm', icon: '🎧', key: 'audio', image: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=220&q=80' },
  { name: 'Đồng hồ, Camera', icon: '📷', key: 'camera', image: 'https://images.unsplash.com/photo-1519181245277-cffeb31da2af?auto=format&fit=crop&w=220&q=80' },
  { name: 'Đồ gia dụng', icon: '🏠', key: 'home', image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=220&q=80' },
  { name: 'Phụ kiện', icon: '🔌', key: 'accessories', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=220&q=80' },
  { name: 'PC, Màn hình, Máy in', icon: '🖥️', key: 'pc', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=220&q=80' },
  { name: 'Tivi', icon: '📺', key: 'tv', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=220&q=80' }
];

export const PRODUCT_LISTS = {
  featured: [
    {
      id: 101,
      name: 'MacBook Air M2',
      price: '28.990.000',
      originalPrice: '32.990.000',
      image: getProductImage(101), // ✅ SỬ DỤNG ID SPECIFIC
      badge: 'Giảm 12%',
      category: 'Laptop',
      categoryKey: 'laptops'
    },
    {
      id: 102,
      name: 'iPhone 15 Pro Max',
      price: '29.990.000',
      originalPrice: '34.990.000',
      image: getProductImage(102), // ✅ SỬ DỤNG ID SPECIFIC
      badge: 'Mới nhất',
      category: 'Điện thoại, Tablet',
      categoryKey: 'smartphones'
    },
    {
      id: 103,
      name: 'ASUS ROG RTX 4080',
      price: '24.990.000',
      originalPrice: '28.990.000',
      image: getProductImage(103, 'pc'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Gaming',
      category: 'PC, Màn hình, Máy in',
      categoryKey: 'pc'
    },
    {
      id: 104,
      name: 'Sony WH-1000XM5',
      price: '6.990.000',
      originalPrice: '8.990.000',
      image: getProductImage(104, 'audio'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Bestseller',
      category: 'Âm thanh, Mic thu âm',
      categoryKey: 'audio'
    },
    {
      id: 105,
      name: 'Canon EOS R8',
      price: '42.990.000',
      originalPrice: '49.990.000',
      image: getProductImage(105, 'camera'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Pro',
      category: 'Đồng hồ, Camera',
      categoryKey: 'camera'
    }
  ],
  
  laptops: [
    {
      id: 201,
      name: 'MacBook Pro M4',
      price: '45.990.000',
      originalPrice: '49.990.000',
      image: getProductImage(201), // ✅ SỬ DỤNG ID SPECIFIC
      badge: 'Mới nhất',
      category: 'Laptop',
      categoryKey: 'laptops'
    },
    {
      id: 202,
      name: 'Dell XPS 13',
      price: '32.990.000',
      originalPrice: '36.990.000',
      image: getProductImage(202), // ✅ SỬ DỤNG ID SPECIFIC
      badge: 'Giảm 11%',
      category: 'Laptop',
      categoryKey: 'laptops'
    },
    {
      id: 203,
      name: 'ASUS ROG Zephyrus',
      price: '38.990.000',
      originalPrice: '42.990.000',
      image: getProductImage(203), // ✅ SỬ DỤNG FUNCTION
      badge: 'Gaming',
      category: 'Laptop',
      categoryKey: 'laptops'
    },
    {
      id: 204,
      name: 'HP Spectre x360',
      price: '29.990.000',
      originalPrice: '33.990.000',
      image: getProductImage(204), // ✅ SỬ DỤNG FUNCTION
      badge: 'Hot',
      category: 'Laptop',
      categoryKey: 'laptops'
    },
    {
      id: 205,
      name: 'Lenovo ThinkPad X1',
      price: '35.990.000',
      originalPrice: '39.990.000',
      image: getProductImage(205), // ✅ SỬ DỤNG FUNCTION
      badge: 'Doanh nhân',
      category: 'Laptop',
      categoryKey: 'laptops'
    },
    {
      id: 206,
      name: 'MSI Creator Z17',
      price: '55.990.000',
      originalPrice: '62.990.000',
      image: getProductImage(206), // ✅ SỬ DỤNG FUNCTION
      badge: 'Creator',
      category: 'Laptop',
      categoryKey: 'laptops'
    },
    {
      id: 207,
      name: 'Surface Laptop 6',
      price: '27.990.000',
      originalPrice: '31.990.000',
      image: getProductImage(207), // ✅ SỬ DỤNG FUNCTION
      badge: 'Microsoft',
      category: 'Laptop',
      categoryKey: 'laptops'
    },
    {
      id: 208,
      name: 'Acer Predator Helios',
      price: '43.990.000',
      originalPrice: '48.990.000',
      image: getProductImage(208), // ✅ SỬ DỤNG FUNCTION
      badge: 'Gaming',
      category: 'Laptop',
      categoryKey: 'laptops'
    },
    {
      id: 209,
      name: 'LG Gram 17',
      price: '33.990.000',
      originalPrice: '37.990.000',
      image: getProductImage(209), // ✅ SỬ DỤNG FUNCTION
      badge: 'Ultralight',
      category: 'Laptop',
      categoryKey: 'laptops'
    },
    {
      id: 210,
      name: 'ASUS Zenbook Pro',
      price: '41.990.000',
      originalPrice: '46.990.000',
      image: getProductImage(210), // ✅ SỬ DỤNG FUNCTION
      badge: 'OLED',
      category: 'Laptop',
      categoryKey: 'laptops'
    },
    {
      id: 211,
      name: 'MacBook Air M3',
      price: '26.990.000',
      originalPrice: '29.990.000',
      image: getProductImage(211), // ✅ SỬ DỤNG FUNCTION
      badge: 'Compact',
      category: 'Laptop',
      categoryKey: 'laptops'
    }
  ],

  smartphones: [
    {
      id: 301,
      name: 'iPhone 15 Pro',
      price: '24.990.000',
      originalPrice: '28.990.000',
      image: getProductImage(301), // ✅ SỬ DỤNG ID SPECIFIC
      badge: 'Hot',
      category: 'Điện thoại, Tablet',
      categoryKey: 'smartphones'
    },
    {
      id: 302,
      name: 'Samsung Galaxy S24 Ultra',
      price: '26.990.000',
      originalPrice: '31.990.000',
      image: getProductImage(302), // ✅ SỬ DỤNG ID SPECIFIC
      badge: 'AI Phone',
      category: 'Điện thoại, Tablet',
      categoryKey: 'smartphones'
    },
    {
      id: 303,
      name: 'Google Pixel 8 Pro',
      price: '19.990.000',
      originalPrice: '24.990.000',
      image: getProductImage(303), // ✅ SỬ DỤNG ID SPECIFIC
      badge: 'AI Camera',
      category: 'Điện thoại, Tablet',
      categoryKey: 'smartphones'
    },
    {
      id: 304,
      name: 'OnePlus 12',
      price: '16.990.000',
      originalPrice: '19.990.000',
      image: getProductImage(304), // ✅ SỬ DỤNG ID SPECIFIC
      badge: 'Fast Charge',
      category: 'Điện thoại, Tablet',
      categoryKey: 'smartphones'
    },
    {
      id: 305,
      name: 'iPhone 15 Plus',
      price: '22.990.000',
      originalPrice: '25.990.000',
      image: getProductImage(305), // ✅ SỬ DỤNG ID SPECIFIC
      badge: 'Large Screen',
      category: 'Điện thoại, Tablet',
      categoryKey: 'smartphones'
    },
    {
      id: 306,
      name: 'Samsung Galaxy S24',
      price: '18.990.000',
      originalPrice: '22.990.000',
      image: getProductImage(306), // ✅ SỬ DỤNG ID SPECIFIC
      badge: 'Compact',
      category: 'Điện thoại, Tablet',
      categoryKey: 'smartphones'
    },
    {
      id: 307,
      name: 'Samsung Galaxy Z Fold6',
      price: '42.990.000',
      originalPrice: '47.990.000',
      image: getProductImage(307), // ✅ SỬ DỤNG ID SPECIFIC
      badge: 'Foldable',
      category: 'Điện thoại, Tablet',
      categoryKey: 'smartphones'
    },
    {
      id: 308,
      name: 'Xiaomi 14 Ultra',
      price: '22.990.000',
      originalPrice: '26.990.000',
      image: getProductImage(308), // ✅ SỬ DỤNG ID SPECIFIC
      badge: 'Camera Pro',
      category: 'Điện thoại, Tablet',
      categoryKey: 'smartphones'
    },
    {
      id: 309,
      name: 'OPPO Find X7 Pro',
      price: '19.990.000',
      originalPrice: '23.990.000',
      image: getProductImage(309), // ✅ SỬ DỤNG ID SPECIFIC
      badge: 'Portrait Master',
      category: 'Điện thoại, Tablet',
      categoryKey: 'smartphones'
    },
    {
      id: 310,
      name: 'Vivo X100 Pro',
      price: '18.990.000',
      originalPrice: '21.990.000',
      image: getProductImage(310), // ✅ SỬ DỤNG ID SPECIFIC
      badge: 'Zeiss Lens',
      category: 'Điện thoại, Tablet',
      categoryKey: 'smartphones'
    },
    {
      id: 311,
      name: 'Nothing Phone (2a)',
      price: '8.990.000',
      originalPrice: '10.990.000',
      image: getProductImage(311, 'smartphone'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Unique Design',
      category: 'Điện thoại, Tablet',
      categoryKey: 'smartphones'
    },
    {
      id: 312,
      name: 'Realme GT 6',
      price: '12.990.000',
      originalPrice: '15.990.000',
      image: getProductImage(312, 'smartphone'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Performance',
      category: 'Điện thoại, Tablet',
      categoryKey: 'smartphones'
    }
  ],

  // ✅ TIẾP TỤC CHO CÁC CATEGORY KHÁC...
  audio: [
    {
      id: 401,
      name: 'Sony WH-1000XM5',
      price: '6.990.000',
      originalPrice: '8.990.000',
      image: getProductImage(401, 'audio'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Bestseller',
      category: 'Âm thanh, Mic thu âm',
      categoryKey: 'audio'
    },
    {
      id: 402,
      name: 'AirPods Pro 2',
      price: '5.990.000',
      originalPrice: '6.990.000',
      image: getProductImage(402, 'audio'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Apple',
      category: 'Âm thanh, Mic thu âm',
      categoryKey: 'audio'
    },
    {
      id: 403,
      name: 'Bose QuietComfort Ultra',
      price: '8.990.000',
      originalPrice: '10.990.000',
      image: getProductImage(403, 'audio'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Premium',
      category: 'Âm thanh, Mic thu âm',
      categoryKey: 'audio'
    },
    {
      id: 404,
      name: 'Sennheiser Momentum 4',
      price: '7.990.000',
      originalPrice: '9.990.000',
      image: getProductImage(404, 'audio'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Audiophile',
      category: 'Âm thanh, Mic thu âm',
      categoryKey: 'audio'
    },
    {
      id: 405,
      name: 'Marshall Major IV',
      price: '3.990.000',
      originalPrice: '4.990.000',
      image: getProductImage(405, 'audio'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Classic',
      category: 'Âm thanh, Mic thu âm',
      categoryKey: 'audio'
    },
    {
      id: 406,
      name: 'JBL Tour One M2',
      price: '4.990.000',
      originalPrice: '6.990.000',
      image: getProductImage(406, 'audio'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Wireless',
      category: 'Âm thanh, Mic thu âm',
      categoryKey: 'audio'
    }
  ],

  camera: [
    {
      id: 501,
      name: 'Canon EOS R8',
      price: '42.990.000',
      originalPrice: '49.990.000',
      image: getProductImage(501, 'camera'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Mirrorless',
      category: 'Đồng hồ, Camera',
      categoryKey: 'camera'
    },
    {
      id: 502,
      name: 'Sony A7 IV',
      price: '51.990.000',
      originalPrice: '58.990.000',
      image: getProductImage(502, 'camera'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Full Frame',
      category: 'Đồng hồ, Camera',
      categoryKey: 'camera'
    },
    {
      id: 503,
      name: 'Fujifilm X-T5',
      price: '38.990.000',
      originalPrice: '43.990.000',
      image: getProductImage(503, 'camera'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Retro Style',
      category: 'Đồng hồ, Camera',
      categoryKey: 'camera'
    },
    {
      id: 504,
      name: 'Nikon Z6 III',
      price: '47.990.000',
      originalPrice: '52.990.000',
      image: getProductImage(504, 'camera'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Video Pro',
      category: 'Đồng hồ, Camera',
      categoryKey: 'camera'
    },
    {
      id: 505,
      name: 'Canon EOS R10',
      price: '22.990.000',
      originalPrice: '26.990.000',
      image: getProductImage(505, 'camera'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Entry Level',
      category: 'Đồng hồ, Camera',
      categoryKey: 'camera'
    },
    {
      id: 506,
      name: 'GoPro Hero 12',
      price: '9.990.000',
      originalPrice: '12.990.000',
      image: getProductImage(506, 'camera'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Action Cam',
      category: 'Đồng hồ, Camera',
      categoryKey: 'camera'
    }
  ],

  tv: [
    {
      id: 601,
      name: 'Samsung Neo QLED 8K 65"',
      price: '49.990.000',
      originalPrice: '59.990.000',
      image: getProductImage(601, 'tv'), // ✅ SỬ DỤNG FUNCTION
      badge: '8K',
      category: 'Tivi',
      categoryKey: 'tv'
    },
    {
      id: 602,
      name: 'LG OLED C4 55"',
      price: '32.990.000',
      originalPrice: '39.990.000',
      image: getProductImage(602, 'tv'), // ✅ SỬ DỤNG FUNCTION
      badge: 'OLED',
      category: 'Tivi',
      categoryKey: 'tv'
    },
    {
      id: 603,
      name: 'Sony Bravia XR A95L 65"',
      price: '65.990.000',
      originalPrice: '75.990.000',
      image: getProductImage(603, 'tv'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Premium',
      category: 'Tivi',
      categoryKey: 'tv'
    },
    {
      id: 604,
      name: 'TCL C845 QLED 75"',
      price: '25.990.000',
      originalPrice: '32.990.000',
      image: getProductImage(604, 'tv'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Large Screen',
      category: 'Tivi',
      categoryKey: 'tv'
    },
    {
      id: 605,
      name: 'Xiaomi TV A Pro 43"',
      price: '6.990.000',
      originalPrice: '8.990.000',
      image: getProductImage(605, 'tv'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Budget',
      category: 'Tivi',
      categoryKey: 'tv'
    },
    {
      id: 606,
      name: 'Samsung Frame TV 55"',
      price: '28.990.000',
      originalPrice: '34.990.000',
      image: getProductImage(606, 'tv'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Art Mode',
      category: 'Tivi',
      categoryKey: 'tv'
    }
  ],

  pc: [
    {
      id: 701,
      name: 'Gaming PC RTX 4090',
      price: '89.990.000',
      originalPrice: '99.990.000',
      image: getProductImage(701, 'pc'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Ultimate',
      category: 'PC, Màn hình, Máy in',
      categoryKey: 'pc'
    },
    {
      id: 702,
      name: 'MacStudio M2 Ultra',
      price: '95.990.000',
      originalPrice: '109.990.000',
      image: getProductImage(702, 'pc'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Pro Workstation',
      category: 'PC, Màn hình, Máy in',
      categoryKey: 'pc'
    },
    {
      id: 703,
      name: 'HP Elite Desktop',
      price: '18.990.000',
      originalPrice: '22.990.000',
      image: getProductImage(703, 'pc'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Business',
      category: 'PC, Màn hình, Máy in',
      categoryKey: 'pc'
    },
    {
      id: 704,
      name: 'Dell OptiPlex Micro',
      price: '12.990.000',
      originalPrice: '15.990.000',
      image: getProductImage(704, 'pc'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Compact',
      category: 'PC, Màn hình, Máy in',
      categoryKey: 'pc'
    },
    {
      id: 705,
      name: 'ASUS ROG Gaming PC',
      price: '45.990.000',
      originalPrice: '52.990.000',
      image: getProductImage(705, 'pc'), // ✅ SỬ DỤNG FUNCTION
      badge: 'RTX 4070',
      category: 'PC, Màn hình, Máy in',
      categoryKey: 'pc'
    },
    {
      id: 706,
      name: 'iMac M3 24"',
      price: '32.990.000',
      originalPrice: '36.990.000',
      image: getProductImage(706, 'pc'), // ✅ SỬ DỤNG FUNCTION
      badge: 'All-in-One',
      category: 'PC, Màn hình, Máy in',
      categoryKey: 'pc'
    }
  ],

  accessories: [
    {
      id: 801,
      name: 'MagSafe Charger 15W',
      price: '990.000',
      originalPrice: '1.290.000',
      image: getProductImage(801, 'accessories'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Wireless',
      category: 'Phụ kiện',
      categoryKey: 'accessories'
    },
    {
      id: 802,
      name: 'Logitech MX Master 3S',
      price: '2.290.000',
      originalPrice: '2.690.000',
      image: getProductImage(802, 'accessories'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Pro Mouse',
      category: 'Phụ kiện',
      categoryKey: 'accessories'
    },
    {
      id: 803,
      name: 'Keychron K8 Pro',
      price: '3.990.000',
      originalPrice: '4.590.000',
      image: getProductImage(803, 'accessories'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Mechanical',
      category: 'Phụ kiện',
      categoryKey: 'accessories'
    },
    {
      id: 804,
      name: 'Anker PowerBank 20000mAh',
      price: '1.290.000',
      originalPrice: '1.590.000',
      image: getProductImage(804, 'accessories'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Fast Charge',
      category: 'Phụ kiện',
      categoryKey: 'accessories'
    },
    {
      id: 805,
      name: 'Belkin USB-C Hub',
      price: '1.990.000',
      originalPrice: '2.490.000',
      image: getProductImage(805, 'accessories'), // ✅ SỬ DỤNG FUNCTION
      badge: '7-in-1',
      category: 'Phụ kiện',
      categoryKey: 'accessories'
    },
    {
      id: 806,
      name: 'Peak Design Tripod',
      price: '8.990.000',
      originalPrice: '10.990.000',
      image: getProductImage(806, 'accessories'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Carbon Fiber',
      category: 'Phụ kiện',
      categoryKey: 'accessories'
    }
  ],

  home: [
    {
      id: 901,
      name: 'Dyson V15 Detect',
      price: '18.990.000',
      originalPrice: '22.990.000',
      image: getProductImage(901, 'home'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Laser Tech',
      category: 'Đồ gia dụng',
      categoryKey: 'home'
    },
    {
      id: 902,
      name: 'Xiaomi Robot Vacuum S12',
      price: '6.990.000',
      originalPrice: '8.990.000',
      image: getProductImage(902, 'home'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Smart Clean',
      category: 'Đồ gia dụng',
      categoryKey: 'home'
    },
    {
      id: 903,
      name: 'Philips Air Fryer XXL',
      price: '4.990.000',
      originalPrice: '6.490.000',
      image: getProductImage(903, 'home'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Healthy Cook',
      category: 'Đồ gia dụng',
      categoryKey: 'home'
    },
    {
      id: 904,
      name: 'Sharp Air Purifier',
      price: '7.990.000',
      originalPrice: '9.990.000',
      image: getProductImage(904, 'home'), // ✅ SỬ DỤNG FUNCTION
      badge: 'PlasmaCluster',
      category: 'Đồ gia dụng',
      categoryKey: 'home'
    },
    {
      id: 905,
      name: 'Electrolux Microwave',
      price: '3.990.000',
      originalPrice: '4.990.000',
      image: getProductImage(905, 'home'), // ✅ SỬ DỤNG FUNCTION
      badge: 'Inverter',
      category: 'Đồ gia dụng',
      categoryKey: 'home'
    },
    {
      id: 906,
      name: 'LG TwinWash Washing Machine',
      price: '25.990.000',
      originalPrice: '31.990.000',
      image: getProductImage(906, 'home'), // ✅ SỬ DỤNG FUNCTION
      badge: 'AI DD',
      category: 'Đồ gia dụng',
      categoryKey: 'home'
    }
  ]
};

// ✅ THÊM DETAILED PRODUCTS VỚI GALLERY CHÍNH XÁC
export const DETAILED_PRODUCTS = {
  1: {
    id: 1,
    name: 'iPhone 17 Pro',
    subtitle: 'Bù thấy it. Đối thấy nhanh.',
    description: 'iPhone 17 Pro mang đến trải nghiệm hoàn toàn mới với chip A18 Pro, camera ProMax và màn hình Super Retina XDR.',
    price: '30.990.000',
    originalPrice: '34.990.000',
    image: getProductImage(1),
    category: 'Điện thoại, Tablet',
    categoryKey: 'smartphones',
    badge: 'Mới nhất',
    images: getProductGallery(1), // ✅ 3 IMAGES CỦA iPhone 17 Pro
    shop: {
      id: 'apple_official',
      name: 'Apple Official Store',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
      productCount: '500+',
      address: 'TP.HCM'
    },
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
    image: getProductImage(201),
    category: 'Laptop',
    categoryKey: 'laptops',
    badge: 'Mới nhất',
    images: getProductGallery(201), // ✅ 3 IMAGES CỦA MacBook Pro M4
    shop: {
      id: 'techstore_official',
      name: 'TechStore Official',
      logoUrl: '',
      productCount: '1.5k+',
      address: 'TP.HCM'
    },
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
    image: getProductImage(301),
    category: 'smartphone',
    badge: 'Hot',
    images: getProductGallery(301), // ✅ 3 IMAGES CỦA iPhone 15 Pro
    shop: {
      id: 'apple_official',
      name: 'Apple Official Store',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
      productCount: '500+',
      address: 'TP.HCM'
    },
    specifications: {
      screen: '6.1" Super Retina XDR',
      chip: 'Apple A17 Pro',
      camera: 'Triple 48MP Pro System',
      battery: '3274 mAh',
      material: 'Titanium'
    }
  },
  // ... có thể thêm tiếp cho các sản phẩm khác
};
