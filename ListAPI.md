🔍 THỰC TẾ CÁC API CÓ TRONG BACKEND:
🛒 BUYER APIs (14 APIs):
BuyerCartController.java (6 APIs):
✅ GET /api/v1/buyer/cart - Lấy giỏ hàng
✅ POST /api/v1/buyer/cart/add - Thêm sản phẩm vào giỏ hàng
✅ PUT /api/v1/buyer/cart/{productVariantId} - Cập nhật số lượng
✅ DELETE /api/v1/buyer/cart/{productVariantId} - Xóa sản phẩm khỏi giỏ hàng
✅ DELETE /api/v1/buyer/cart/clear - Xóa toàn bộ giỏ hàng
✅ GET /api/v1/buyer/cart/count - Lấy số lượng sản phẩm trong giỏ hàng
BuyerOrderController.java (4 APIs):
✅ POST /api/v1/buyer/orders/checkout - Checkout và tạo đơn hàng
✅ GET /api/v1/buyer/orders - Lấy lịch sử đơn hàng
✅ GET /api/v1/buyer/orders/{orderId} - Lấy chi tiết đơn hàng
✅ PUT /api/v1/buyer/orders/{orderId}/cancel - Hủy đơn hàng
BuyerAddressController.java (4 APIs):
✅ GET /api/v1/buyer/address - Lấy địa chỉ
✅ POST /api/v1/buyer/address - Tạo/cập nhật địa chỉ
✅ DELETE /api/v1/buyer/address - Xóa địa chỉ
✅ GET /api/v1/buyer/address/check - Kiểm tra có địa chỉ không
🌐 PUBLIC APIs (không cần đăng nhập):
ProductController.java (4 APIs):
✅ GET /api/v1/products - Tìm kiếm sản phẩm
✅ GET /api/v1/products/{id} - Lấy chi tiết sản phẩm
✅ GET /api/v1/products/category/{name} - Lấy sản phẩm theo danh mục
✅ GET /api/v1/products/category/{category}/brand/{brand} - Lấy sản phẩm theo danh mục và thương hiệu
ProductVariantController.java (6 APIs):
✅ GET /api/v1/product-variants/{id} - Lấy biến thể theo ID
✅ GET /api/v1/product-variants/store/{storeId} - Lấy biến thể theo cửa hàng
✅ GET /api/v1/product-variants/product/{productId} - Lấy tất cả biến thể của sản phẩm
✅ GET /api/v1/product-variants/latest - Lấy biến thể mới nhất
✅ GET /api/v1/product-variants/category/{category} - Lấy biến thể theo danh mục
✅ GET /api/v1/product-variants/category/{category}/brand/{brand} - Lấy biến thể theo danh mục và thương hiệu
CategoryController.java (9 APIs):
✅ GET /api/v1/categories - Lấy danh sách danh mục
✅ GET /api/v1/categories/{id} - Lấy danh mục theo ID
✅ GET /api/v1/categories/all - Lấy tất cả danh mục
✅ POST /api/v1/categories - Tạo danh mục mới
✅ PUT /api/v1/categories/{id} - Cập nhật danh mục
✅ DELETE /api/v1/categories/{id} - Xóa danh mục
✅ GET /api/v1/categories/{id}/exists - Kiểm tra danh mục tồn tại
✅ GET /api/v1/categories/name/{name} - Lấy danh mục theo tên
✅ GET /api/v1/categories/name/{name}/exists - Kiểm tra danh mục tồn tại theo tên
BrandController.java (9 APIs):
✅ GET /api/v1/brands - Lấy danh sách thương hiệu
✅ GET /api/v1/brands/{id} - Lấy thương hiệu theo ID
✅ GET /api/v1/brands/all - Lấy tất cả thương hiệu
✅ POST /api/v1/brands - Tạo thương hiệu mới
✅ PUT /api/v1/brands/{id} - Cập nhật thương hiệu
✅ DELETE /api/v1/brands/{id} - Xóa thương hiệu
✅ GET /api/v1/brands/{id}/exists - Kiểm tra thương hiệu tồn tại
✅ GET /api/v1/brands/name/{name} - Lấy thương hiệu theo tên
✅ GET /api/v1/brands/name/{name}/exists - Kiểm tra thương hiệu tồn tại theo tên
StoreController.java (3 APIs):
✅ GET /api/v1/stores - Lấy danh sách cửa hàng
✅ GET /api/v1/stores/{storeId} - Lấy chi tiết cửa hàng
✅ GET /api/v1/stores/owner/{ownerId} - Lấy cửa hàng theo chủ sở hữu
ReviewController.java (8 APIs):
✅ POST /api/v1/reviews - Tạo đánh giá
✅ GET /api/v1/reviews/my-reviews - Lấy đánh giá của user
✅ PUT /api/v1/reviews/{reviewId} - Cập nhật đánh giá
✅ DELETE /api/v1/reviews/{reviewId} - Xóa đánh giá
✅ GET /api/v1/reviews/{reviewId} - Lấy đánh giá theo ID
✅ GET /api/v1/reviews/product/{productId} - Lấy đánh giá theo sản phẩm
✅ GET /api/v1/reviews/product-variant/{productVariantId} - Lấy đánh giá theo biến thể sản phẩm
✅ GET /api/v1/reviews/product-variant/{productVariantId}/stats - Lấy thống kê đánh giá
UserController.java (5 APIs):
✅ POST /api/v1/users/register - Đăng ký user
✅ POST /api/v1/users/login - Đăng nhập
✅ GET /api/v1/users/current - Lấy thông tin user hiện tại
✅ GET /api/v1/users/verify - Xác thực email
✅ POST /api/v1/users/auth/social/callback - Google OAuth callback
ForgotPasswordController.java (2 APIs):
✅ POST /forgot-password - Quên mật khẩu
✅ POST /reset-password - Đặt lại mật khẩu
🎯 TỔNG KẾT CHÍNH XÁC:
✅ Tổng cộng: 127 API endpoints trong backend
✅ Buyer APIs: 14 APIs (Cart, Order, Address)
✅ Public APIs: 39 APIs (Products, Categories, Brands, Stores, Reviews)
✅ User APIs: 7 APIs (Authentication, Profile)
✅ Admin APIs: 12 APIs (Product, Store management)
✅ B2C APIs: 55 APIs (Seller management)
Đây là danh sách CHÍNH XÁC các API có trong backend! 🎯