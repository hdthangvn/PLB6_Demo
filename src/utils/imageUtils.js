// High-quality product images from Unsplash with specific product categories
const PRODUCT_IMAGE_COLLECTIONS = {
  // LAPTOPS - Professional laptop images
  laptop: [
    // MacBook Air M2, MacBook Pro M4
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&q=80',
    
    // Dell XPS, ASUS ROG
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop&q=80',
    
    // HP Spectre, Lenovo ThinkPad
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=600&h=600&fit=crop&q=80',
    
    // MSI Creator, Surface
    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=600&h=600&fit=crop&q=80'
  ],

  // SMARTPHONES - High-end phone images
  smartphone: [
    // iPhone Series
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=600&fit=crop&q=80',
    
    // Samsung Galaxy
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop&q=80',
    
    // Google Pixel, OnePlus
    'https://images.unsplash.com/photo-1607936854279-55e8f4bc233d?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop&q=80',
    
    // Xiaomi, OPPO
    'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571366992887-4428b1d37916?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=600&h=600&fit=crop&q=80'
  ],

  // AUDIO - Professional headphones & speakers
  audio: [
    // Sony WH-1000XM5, Premium headphones
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop&q=80',
    
    // AirPods, Wireless earbuds
    'https://images.unsplash.com/photo-1590658165737-15a047b2d0b8?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=600&fit=crop&q=80'
  ],

  // CAMERAS - Professional photography equipment
  camera: [
    // Canon EOS, Professional DSLR
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop&q=80',
    
    // Sony Alpha, Mirrorless
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=600&fit=crop&q=80'
  ],

  // TV - Smart TVs and displays
  tv: [
    // Samsung QLED, LG OLED
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571682667899-79f3abfe9e97?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558618666-fbd26c85cd64?w=600&h=600&fit=crop&q=80'
  ],

  // PC - Gaming & Workstation PCs
  pc: [
    // Gaming PC with RGB
    'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541015140811-65a0e5a5280b?w=600&h=600&fit=crop&q=80',
    
    // Workstation, All-in-one
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&h=600&fit=crop&q=80'
  ],

  // ACCESSORIES - Tech accessories
  accessories: [
    // Keyboards, mice
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop&q=80',
    
    // Chargers, cables
    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1615992174118-9b8e9be025e7?w=600&h=600&fit=crop&q=80'
  ],

  // HOME APPLIANCES
  home: [
    // Vacuum cleaners, air purifiers
    'https://images.unsplash.com/photo-1558618666-fbd26c85cd64?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&h=600&fit=crop&q=80'
  ]
};

// SPECIFIC PRODUCT IMAGES - Mỗi sản phẩm có 3 ảnh riêng biệt
const SPECIFIC_PRODUCT_IMAGES = {
  // IPHONE 15 PRO - 3 ảnh khác nhau của iPhone 15 Pro
  1: [
    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop&q=80', // iPhone 15 Pro chính diện
    'https://images.unsplash.com/photo-1695048133093-3d55ea5e9799?w=600&h=600&fit=crop&q=80', // iPhone 15 Pro mặt sau
    'https://images.unsplash.com/photo-1695048066042-8c3eea9ac82a?w=600&h=600&fit=crop&q=80'  // iPhone 15 Pro cạnh bên
  ],
  
  // MACBOOK PRO M4 - 3 ảnh khác nhau của MacBook Pro M4
  2: [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop&q=80', // MacBook mở
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop&q=80', // MacBook đóng
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&q=80'  // MacBook nghiêng
  ],
  
  // GAMING SETUP PRO
  3: [
    'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&h=600&fit=crop&q=80', // Gaming PC RGB
    'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&h=600&fit=crop&q=80', // Gaming setup
    'https://images.unsplash.com/photo-1541015140811-65a0e5a5280b?w=600&h=600&fit=crop&q=80'  // Gaming components
  ],
  
  // FEATURED PRODUCTS
  101: [ // MacBook Air M2
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&q=80'
  ],
  102: [ // iPhone 15 Pro Max
    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1695048133093-3d55ea5e9799?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1695048066042-8c3eea9ac82a?w=600&h=600&fit=crop&q=80'
  ],
  103: [ // ASUS ROG RTX 4080
    'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541015140811-65a0e5a5280b?w=600&h=600&fit=crop&q=80'
  ],
  104: [ // Sony WH-1000XM5
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop&q=80'
  ],
  105: [ // Canon EOS R8
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop&q=80'
  ],

  // LAPTOPS
  201: [ // MacBook Pro M4
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&q=80'
  ],
  202: [ // Dell XPS 13
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop&q=80'
  ],
  203: [ // ASUS ROG Zephyrus
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=600&h=600&fit=crop&q=80'
  ],
  204: [ // HP Spectre x360
    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=600&h=600&fit=crop&q=80'
  ],
  205: [ // Lenovo ThinkPad X1
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&q=80'
  ],
  206: [ // MSI Creator Z17
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop&q=80'
  ],
  207: [ // Surface Laptop 6
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=600&h=600&fit=crop&q=80'
  ],
  208: [ // Acer Predator Helios
    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=600&h=600&fit=crop&q=80'
  ],
  209: [ // LG Gram 17
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&q=80'
  ],
  210: [ // ASUS Zenbook Pro
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop&q=80'
  ],
  211: [ // MacBook Air M3
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=600&h=600&fit=crop&q=80'
  ],

  // SMARTPHONES  
  301: [ // iPhone 15 Pro
    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1695048133093-3d55ea5e9799?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1695048066042-8c3eea9ac82a?w=600&h=600&fit=crop&q=80'
  ],
  302: [ // Samsung Galaxy S24 Ultra
    'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop&q=80'
  ],
  303: [ // Google Pixel 8 Pro
    'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1607936854279-55e8f4bc233d?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&h=600&fit=crop&q=80'
  ],
  304: [ // OnePlus 12
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571366992887-4428b1d37916?w=600&h=600&fit=crop&q=80'
  ],
  305: [ // iPhone 15 Plus
    'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop&q=80'
  ],
  306: [ // Samsung Galaxy S24
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop&q=80'
  ],
  307: [ // Samsung Galaxy Z Fold6
    'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1607936854279-55e8f4bc233d?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&h=600&fit=crop&q=80'
  ],
  308: [ // Xiaomi 14 Ultra
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571366992887-4428b1d37916?w=600&h=600&fit=crop&q=80'
  ],
  309: [ // OPPO Find X7 Pro
    'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop&q=80'
  ],
  310: [ // Vivo X100 Pro
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop&q=80'
  ],
  311: [ // Nothing Phone (2a)
    'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1607936854279-55e8f4bc233d?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&h=600&fit=crop&q=80'
  ],
  312: [ // Realme GT 6
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571366992887-4428b1d37916?w=600&h=600&fit=crop&q=80'
  ],

  // AUDIO
  401: [ // Sony WH-1000XM5
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop&q=80'
  ],
  402: [ // AirPods Pro 2
    'https://images.unsplash.com/photo-1590658165737-15a047b2d0b8?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=600&fit=crop&q=80'
  ],
  403: [ // Bose QuietComfort Ultra
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop&q=80'
  ],
  404: [ // Sennheiser Momentum 4
    'https://images.unsplash.com/photo-1590658165737-15a047b2d0b8?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=600&fit=crop&q=80'
  ],
  405: [ // Marshall Major IV
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop&q=80'
  ],
  406: [ // JBL Tour One M2
    'https://images.unsplash.com/photo-1590658165737-15a047b2d0b8?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=600&fit=crop&q=80'
  ],

  // CAMERAS
  501: [ // Canon EOS R8
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop&q=80'
  ],
  502: [ // Sony A7 IV
    'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600&h=600&fit=crop&q=80'
  ],
  503: [ // Fujifilm X-T5
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=600&fit=crop&q=80'
  ],
  504: [ // Nikon Z6 III
    'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=600&fit=crop&q=80'
  ],
  505: [ // Canon EOS R10
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop&q=80'
  ],
  506: [ // GoPro Hero 12
    'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600&h=600&fit=crop&q=80'
  ],

  // TV
  601: [ // Samsung Neo QLED 8K 65"
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571682667899-79f3abfe9e97?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558618666-fbd26c85cd64?w=600&h=600&fit=crop&q=80'
  ],
  602: [ // LG OLED C4 55"
    'https://images.unsplash.com/photo-1571682667899-79f3abfe9e97?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558618666-fbd26c85cd64?w=600&h=600&fit=crop&q=80'
  ],
  603: [ // Sony Bravia XR A95L 65"
    'https://images.unsplash.com/photo-1558618666-fbd26c85cd64?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571682667899-79f3abfe9e97?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop&q=80'
  ],
  604: [ // TCL C845 QLED 75"
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571682667899-79f3abfe9e97?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558618666-fbd26c85cd64?w=600&h=600&fit=crop&q=80'
  ],
  605: [ // Xiaomi TV A Pro 43"
    'https://images.unsplash.com/photo-1571682667899-79f3abfe9e97?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558618666-fbd26c85cd64?w=600&h=600&fit=crop&q=80'
  ],
  606: [ // Samsung Frame TV 55"
    'https://images.unsplash.com/photo-1558618666-fbd26c85cd64?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571682667899-79f3abfe9e97?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop&q=80'
  ],

  // PC
  701: [ // Gaming PC RTX 4090
    'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541015140811-65a0e5a5280b?w=600&h=600&fit=crop&q=80'
  ],
  702: [ // MacStudio M2 Ultra
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&h=600&fit=crop&q=80'
  ],
  703: [ // HP Elite Desktop
    'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541015140811-65a0e5a5280b?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop&q=80'
  ],
  704: [ // Dell OptiPlex Micro
    'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&h=600&fit=crop&q=80'
  ],
  705: [ // ASUS ROG Gaming PC
    'https://images.unsplash.com/photo-1541015140811-65a0e5a5280b?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&h=600&fit=crop&q=80'
  ],
  706: [ // iMac M3 24"
    'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541015140811-65a0e5a5280b?w=600&h=600&fit=crop&q=80'
  ],

  // ACCESSORIES
  801: [ // MagSafe Charger 15W
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop&q=80'
  ],
  802: [ // Logitech MX Master 3S
    'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop&q=80'
  ],
  803: [ // Keychron K8 Pro
    'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop&q=80'
  ],
  804: [ // Anker PowerBank 20000mAh
    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1615992174118-9b8e9be025e7?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop&q=80'
  ],
  805: [ // Belkin USB-C Hub
    'https://images.unsplash.com/photo-1615992174118-9b8e9be025e7?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&h=600&fit=crop&q=80'
  ],
  806: [ // Peak Design Tripod
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1615992174118-9b8e9be025e7?w=600&h=600&fit=crop&q=80'
  ],

  // HOME APPLIANCES
  901: [ // Dyson V15 Detect
    'https://images.unsplash.com/photo-1558618666-fbd26c85cd64?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&h=600&fit=crop&q=80'
  ],
  902: [ // Xiaomi Robot Vacuum S12
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558618666-fbd26c85cd64?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&h=600&fit=crop&q=80'
  ],
  903: [ // Philips Air Fryer XXL
    'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558618666-fbd26c85cd64?w=600&h=600&fit=crop&q=80'
  ],
  904: [ // Sharp Air Purifier
    'https://images.unsplash.com/photo-1558618666-fbd26c85cd64?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop&q=80'
  ],
  905: [ // Electrolux Microwave
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558618666-fbd26c85cd64?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&h=600&fit=crop&q=80'
  ],
  906: [ // LG TwinWash Washing Machine
    'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558618666-fbd26c85cd64?w=600&h=600&fit=crop&q=80'
  ]
};

// ✅ CẬP NHẬT CÁC FUNCTION
// Function to get main product image (ảnh đầu tiên)
export const getProductImage = (productId) => {
  const productImages = SPECIFIC_PRODUCT_IMAGES[productId];
  if (productImages && productImages.length > 0) {
    return productImages[0]; // Trả về ảnh đầu tiên
  }
  
  // Fallback nếu không tìm thấy
  return 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop&q=80';
};

// Function to get product gallery (3 ảnh của cùng sản phẩm)
export const getProductGallery = (productId) => {
  const productImages = SPECIFIC_PRODUCT_IMAGES[productId];
  if (productImages && productImages.length >= 3) {
    return productImages; // Trả về cả 3 ảnh
  }
  
  // Fallback nếu không đủ ảnh
  const fallbackImage = getProductImage(productId);
  return [fallbackImage, fallbackImage, fallbackImage];
};

// Function to get hero image (độ phân giải cao hơn cho hero slider)
export const getHeroImage = (productId) => {
  const baseImage = getProductImage(productId);
  // Return higher resolution version for hero
  return baseImage.replace('w=600&h=600', 'w=1200&h=600');
};

// Get random image for new products
export const getRandomProductImage = () => {
  const allImages = Object.values(SPECIFIC_PRODUCT_IMAGES).flat();
  const randomIndex = Math.floor(Math.random() * allImages.length);
  return allImages[randomIndex];
};