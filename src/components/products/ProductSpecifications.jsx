const ProductSpecifications = ({ product }) => {
  // Generate specifications based on product category
  const getSpecifications = () => {
    switch (product?.category) {
      case 'smartphone':
        return {
          'Kích thước màn hình': '6.8 inches',
          'Công nghệ màn hình': 'OLED',
          'Camera sau': '50MP + 2MP',
          'Camera trước': '16MP',
          'Chipset': 'Unisoc T9100',
          'Công nghệ NFC': 'Có',
          'Dung lượng RAM': '12 GB',
          'Bộ nhớ trong': '256 GB',
          'Pin': '6000mAh',
          'Thẻ SIM': '2 Nano-SIM',
          'Hệ điều hành': 'Android 15',
          'Độ phân giải màn hình': '1080 x 2392 pixels',
          'Tính năng màn hình': 'FullHD+, Tần số 120Hz'
        };
      
      case 'laptop':
        return {
          'Processor': 'Apple M4 Chip',
          'RAM': '16GB Unified Memory',
          'Storage': '512GB SSD',
          'Display': '14" Liquid Retina XDR',
          'Graphics': 'Integrated GPU',
          'Battery': 'Up to 22 hours',
          'Operating System': 'macOS Sequoia',
          'Ports': '3x Thunderbolt 4, MagSafe 3',
          'Wireless': 'Wi-Fi 6E, Bluetooth 5.3',
          'Weight': '1.55 kg',
          'Dimensions': '31.26 x 22.12 x 1.55 cm',
          'Touch ID': 'Có'
        };
      
      case 'audio':
        return {
          'Driver Size': '40mm',
          'Frequency Response': '20Hz - 20kHz',
          'Impedance': '16 Ohm',
          'Connectivity': 'Bluetooth 5.2, 3.5mm',
          'Battery Life': 'Up to 30 hours',
          'Noise Cancellation': 'Active ANC',
          'Weight': '254g',
          'Charging': 'USB-C Quick Charge',
          'Voice Assistant': 'Google Assistant, Alexa',
          'Controls': 'Touch Control',
          'Foldable': 'Có',
          'Microphone': 'Built-in HD Mic'
        };
      
      case 'camera':
        return {
          'Sensor': '24.2MP Full-Frame CMOS',
          'Mount': 'RF Mount',
          'ISO Range': '100-102,400',
          'Autofocus': '4,779 AF Points',
          'Video': '4K 60p, Full HD 120p',
          'Display': '3.0" Vari-angle LCD',
          'Viewfinder': '0.5" OLED EVF',
          'Storage': 'SD UHS-II, CFexpress',
          'Battery': 'LP-E6NH',
          'Weight': '612g (body only)',
          'Dimensions': '132.5 x 85.4 x 70.0 mm',
          'Weather Sealing': 'Có'
        };
      
      case 'tv':
        return {
          'Kích thước màn hình': '65 inches',
          'Độ phân giải': '8K (7680 x 4320)',
          'Công nghệ hiển thị': 'Neo QLED',
          'HDR': 'HDR10+, Dolby Vision',
          'Tần số quét': '120Hz',
          'Smart TV': 'Tizen OS',
          'Connectivity': 'Wi-Fi 6, Bluetooth 5.2',
          'HDMI': '4 cổng HDMI 2.1',
          'USB': '3 cổng USB',
          'Audio': 'Dolby Atmos, 60W',
          'Điều khiển': 'Voice Remote, One Remote',
          'Kích thước': '1448.4 x 829.9 x 26.9 mm'
        };
      
      case 'pc':
        return {
          'Processor': 'Intel Core i9-13900KF',
          'Graphics Card': 'NVIDIA RTX 4090 24GB',
          'RAM': '32GB DDR5-5600',
          'Storage': '1TB NVMe SSD + 2TB HDD',
          'Motherboard': 'Z790 Chipset',
          'Power Supply': '1000W 80+ Gold',
          'Cooling': 'AIO Liquid Cooler 360mm',
          'Case': 'Mid-Tower RGB',
          'Connectivity': 'Wi-Fi 6E, Bluetooth 5.3',
          'Ports': 'USB 3.2, USB-C, HDMI, DP',
          'Operating System': 'Windows 11 Pro',
          'Warranty': '3 năm'
        };
      
      case 'accessories':
        return {
          'Kết nối': 'Wireless Charging',
          'Công suất': '15W MagSafe',
          'Tương thích': 'iPhone 12 series trở lên',
          'Material': 'Aluminum + Silicone',
          'Kích thước': '95 x 95 x 6.8 mm',
          'Trọng lượng': '145g',
          'Cáp': 'USB-C to USB-C 1m',
          'Chứng nhận': 'Qi Certified',
          'Nhiệt độ hoạt động': '0°C to 35°C',
          'Màu sắc': 'Trắng',
          'Bảo hành': '1 năm',
          'LED Indicator': 'Có'
        };
      
      case 'home':
        return {
          'Loại': 'Máy hút bụi không dây',
          'Công suất hút': '230W',
          'Thời gian hoạt động': 'Đến 60 phút',
          'Dung tích hộp chứa': '0.77L',
          'Cân nặng': '3.0kg',
          'Công nghệ': 'Laser Detect',
          'Phụ kiện': '8 đầu hút chuyên dụng',
          'Sạc': 'Dock sạc treo tường',
          'Màn hình LCD': 'Có',
          'Lọc HEPA': 'Có',
          'Bảo hành': '2 năm',
          'Xuất xứ': 'Malaysia'
        };
      
      default:
        return {
          'Brand': product?.name?.split(' ')[0] || 'Unknown',
          'Model': product?.name || 'N/A',
          'Category': product?.category || 'General',
          'Price': product?.price ? `${product.price}đ` : 'N/A',
          'Availability': 'Còn hàng',
          'Warranty': '12 tháng',
          'Origin': 'Chính hãng',
          'Condition': 'Mới 100%'
        };
    }
  };

  const specifications = getSpecifications();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Thông số kỹ thuật</h2>
      
      <div className="overflow-hidden">
        <table className="w-full">
          <tbody>
            {Object.entries(specifications).map(([key, value], index) => (
              <tr 
                key={key} 
                className={`border-b border-gray-100 last:border-b-0 ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <td className="py-3 px-4 text-sm font-medium text-gray-600 w-1/3">
                  {key}
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">
                  {key === 'Công nghệ màn hình' && value === 'OLED' ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {value}
                    </span>
                  ) : key.toLowerCase().includes('camera') && value.includes('MP') ? (
                    <span className="font-medium text-purple-700">{value}</span>
                  ) : key.toLowerCase().includes('pin') || key.toLowerCase().includes('battery') ? (
                    <span className="font-medium text-green-700">{value}</span>
                  ) : (
                    value
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">📋 Lưu ý quan trọng</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Thông số có thể thay đổi tùy theo phiên bản</li>
          <li>• Kiểm tra kỹ thông số trước khi mua</li>
          <li>• Liên hệ tư vấn nếu có thắc mắc</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductSpecifications;