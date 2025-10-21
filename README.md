# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Những cái đã sửa:
1. Thêm animation quảng cáo trang Home
2. Sửa icon button Thông báo
3. Thêm ô tick để chọn sản phẩm cần mua trong giỏ hàng
4. Trong giỏ hàng bấm vào sản phẩm nào thì nó sẽ chuyển sang cái trang chi tiết sản phẩm đó
5. Lọc nâng cao (Ram, Cpu, brand,...), thêm 1 số phần lọc nâng cao cho từng loại sản phẩm
6. Đặt hàng, lịch sử đặt hàng
7. Đổi logic đánh giá : Mua hàng mới được đánh giá 
8. Thêm mục bình luận dưới mỗi sản phẩm




BỔ SUNG TRANG CHO SELLER VÀ CHỦ STORE CÓ NHIỀU CHI NHÁNH
http://localhost:5173/seller/dashboard
http://localhost:5173/store/dashboard


✅ CÁC NHÓM API ĐÃ TEST THÀNH CÔNG:



🔐 Authentication APIs (4/4 APIs):
✅ POST /api/v1/users/register - Đăng ký tài khoản
✅ POST /api/v1/users/login - Đăng nhập
✅ GET /api/v1/users/verify - Xác thực email
✅ GET /api/v1/users/current - Lấy thông tin user hiện tại



👤 Profile Management APIs (1/1 APIs):
✅ PUT /api/v1/users/profile - Cập nhật thông tin cá nhân (thông qua userService)
🏠 Address Management APIs (4/4 APIs):
✅ GET /api/v1/buyer/address - Lấy địa chỉ (có fallback localStorage)
✅ POST /api/v1/buyer/address - Tạo/cập nhật địa chỉ
✅ DELETE /api/v1/buyer/address - Xóa địa chỉ
✅ GET /api/v1/buyer/address/check - Kiểm tra có địa chỉ không



📦 Product Browsing APIs (4/4 APIs):
✅ GET /api/v1/products - Lấy danh sách sản phẩm
✅ GET /api/v1/products/{id} - Lấy chi tiết sản phẩm
✅ GET /api/v1/products/category/{name} - Lấy sản phẩm theo danh mục
✅ GET /api/v1/products/category/{category}/brand/{brand} - Lấy sản phẩm theo danh mục và thương hiệu




🔧 Product Variant Browsing APIs (2/6 APIs):
✅ GET /api/v1/product-variants/product/{productId} - Lấy biến thể của sản phẩm
✅ GET /api/v1/product-variants/{id} - Lấy biến thể theo ID
⏳ GET /api/v1/product-variants/store/{storeId} - Chưa test
⏳ GET /api/v1/product-variants/latest - Chưa test
⏳ GET /api/v1/product-variants/category/{category} - Chưa test
⏳ GET /api/v1/product-variants/category/{category}/brand/{brand} - Chưa test



🏷️ Category APIs (1/9 APIs):
✅ GET /api/v1/categories - Lấy danh sách danh mục
⏳ GET /api/v1/categories/{id} - Chưa test
⏳ GET /api/v1/categories/all - Chưa test
⏳ POST /api/v1/categories - Chưa test
⏳ PUT /api/v1/categories/{id} - Chưa test
⏳ DELETE /api/v1/categories/{id} - Chưa test
⏳ GET /api/v1/categories/{id}/exists - Chưa test
⏳ GET /api/v1/categories/name/{name} - Chưa test
⏳ GET /api/v1/categories/name/{name}/exists - Chưa test


🏪 Store Browsing APIs (2/3 APIs):
✅ GET /api/v1/stores - Lấy danh sách cửa hàng (StoresPage)
✅ GET /api/v1/stores/{storeId} - Lấy chi tiết cửa hàng (StoreDetailPage)
⏳ GET /api/v1/stores/owner/{ownerId} - Chưa test
🔍 Search APIs (1/1 APIs):
✅ GET /api/v1/products?name={query} - Tìm kiếm sản phẩm

🎯 CÁC API ĐÃ TÍCH HỢP VÀO GIAO DIỆN USER:

📱 Search Bar với Auto-complete:
✅ GET /api/v1/brands - Hiển thị suggestions thương hiệu
✅ GET /api/v1/products?name={query} - Hiển thị suggestions sản phẩm

🏪 Stores Page:
✅ GET /api/v1/stores - Hiển thị danh sách cửa hàng
✅ GET /api/v1/stores/{id} - Hiển thị chi tiết cửa hàng + sản phẩm

🛍️ Product Detail Page:
✅ GET /api/v1/products/{id} - Hiển thị thông tin sản phẩm
✅ GET /api/v1/product-variants/product/{productId} - Hiển thị variants (colors, storage)
✅ GET /api/v1/reviews/product/{productId} - Hiển thị đánh giá sản phẩm
✅ GET /api/v1/stores/{storeId} - Hiển thị thông tin cửa hàng

🔍 Search Results Page:
✅ GET /api/v1/products?name={query}&brand={brand} - Tìm kiếm theo tên và thương hiệu
✅ Client-side filtering cho brands (do backend thiếu brand field)

👤 Profile Page:
✅ GET /api/v1/users/current - Hiển thị thông tin user
✅ PUT /api/v1/users/profile - Cập nhật thông tin cá nhân
✅ GET /api/v1/buyer/address - Hiển thị địa chỉ
✅ POST /api/v1/buyer/address - Tạo/cập nhật địa chỉ




❌ CÁC NHÓM API TEST THẤT BẠI:





🛒 Cart Management APIs (2/6 APIs):




❌ GET /api/v1/buyer/cart - 500 Error (user chưa có cart)
❌ POST /api/v1/buyer/cart/add - 500 Error (user chưa có cart)
⏳ PUT /api/v1/buyer/cart/{productVariantId} - Chưa test
⏳ DELETE /api/v1/buyer/cart/{productVariantId} - Chưa test
⏳ DELETE /api/v1/buyer/cart/clear - Chưa test
⏳ GET /api/v1/buyer/cart/count - Chưa test



📋 CÁC API CÒN LẠI CẦN TÍCH HỢP:

🛒 Cart Management APIs (0/6 APIs):
⏳ GET /api/v1/buyer/cart - Lấy giỏ hàng
⏳ POST /api/v1/buyer/cart/add - Thêm vào giỏ hàng
⏳ PUT /api/v1/buyer/cart/{productVariantId} - Cập nhật số lượng
⏳ DELETE /api/v1/buyer/cart/{productVariantId} - Xóa khỏi giỏ hàng
⏳ DELETE /api/v1/buyer/cart/clear - Xóa toàn bộ giỏ hàng
⏳ GET /api/v1/buyer/cart/count - Đếm số lượng sản phẩm

📋 Order Management APIs (0/4 APIs):
⏳ POST /api/v1/buyer/orders/checkout - Đặt hàng
⏳ GET /api/v1/buyer/orders - Lịch sử đặt hàng
⏳ GET /api/v1/buyer/orders/{orderId} - Chi tiết đơn hàng
⏳ PUT /api/v1/buyer/orders/{orderId}/cancel - Hủy đơn hàng

⭐ Review Management APIs (7/8 APIs còn lại):
⏳ POST /api/v1/reviews - Tạo đánh giá
⏳ GET /api/v1/reviews/my-reviews - Đánh giá của tôi
⏳ PUT /api/v1/reviews/{reviewId} - Cập nhật đánh giá
⏳ DELETE /api/v1/reviews/{reviewId} - Xóa đánh giá
⏳ GET /api/v1/reviews/{reviewId} - Chi tiết đánh giá
⏳ GET /api/v1/reviews/product-variant/{productVariantId} - Đánh giá theo variant
⏳ GET /api/v1/reviews/product-variant/{productVariantId}/stats - Thống kê đánh giá

🏷️ Brand APIs (8/9 APIs còn lại):
⏳ GET /api/v1/brands/{id} - Chi tiết thương hiệu
⏳ GET /api/v1/brands/all - Tất cả thương hiệu
⏳ POST /api/v1/brands - Tạo thương hiệu
⏳ PUT /api/v1/brands/{id} - Cập nhật thương hiệu
⏳ DELETE /api/v1/brands/{id} - Xóa thương hiệu
⏳ GET /api/v1/brands/{id}/exists - Kiểm tra tồn tại
⏳ GET /api/v1/brands/name/{name} - Tìm theo tên
⏳ GET /api/v1/brands/name/{name}/exists - Kiểm tra tên tồn tại

🏷️ Category APIs (8/9 APIs còn lại):
⏳ GET /api/v1/categories/{id} - Chi tiết danh mục
⏳ GET /api/v1/categories/all - Tất cả danh mục
⏳ POST /api/v1/categories - Tạo danh mục
⏳ PUT /api/v1/categories/{id} - Cập nhật danh mục
⏳ DELETE /api/v1/categories/{id} - Xóa danh mục
⏳ GET /api/v1/categories/{id}/exists - Kiểm tra tồn tại
⏳ GET /api/v1/categories/name/{name} - Tìm theo tên
⏳ GET /api/v1/categories/name/{name}/exists - Kiểm tra tên tồn tại

🔧 Product Variant APIs (4/6 APIs còn lại):
⏳ GET /api/v1/product-variants/store/{storeId} - Variants theo cửa hàng
⏳ GET /api/v1/product-variants/latest - Variants mới nhất
⏳ GET /api/v1/product-variants/category/{category} - Variants theo danh mục
⏳ GET /api/v1/product-variants/category/{category}/brand/{brand} - Variants theo danh mục và thương hiệu

🏪 Store APIs (1/3 APIs còn lại):
⏳ GET /api/v1/stores/owner/{ownerId} - Cửa hàng theo chủ sở hữu

📊 TỔNG KẾT:
✅ Đã tích hợp: 15 APIs thành công
⏳ Còn lại: 45 APIs chưa tích hợp
❌ Lỗi: 2 APIs (Cart APIs - 500 Error)