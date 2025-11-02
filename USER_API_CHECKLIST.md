# 👥 USER/BUYER API CHECKLIST

**API dành cho Người dùng/Khách hàng mua sắm**  
**Base URL (Production):** `https://e-commerce-raq1.onrender.com`  
**Base URL (Local):** `http://localhost:8080`

---

## 📊 Tổng Quan

Danh sách này chỉ bao gồm các API mà **USER/BUYER (Khách hàng)** sử dụng, không bao gồm API dành cho Seller/Store hay Admin.

**Tổng số API cho USER:** 56 endpoints

---

## 🔐 Authentication

### Public APIs
Không yêu cầu token, bất kỳ ai cũng truy cập được.

### Protected APIs
Yêu cầu **Bearer Token** trong header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 📋 Danh Sách API Theo Nhóm

### 1️⃣ **👤 Quản Lý Tài Khoản** (User Management)

#### Public APIs (Không cần đăng nhập)
- [✓] **POST** `/api/v1/users/register` - Đăng ký tài khoản mới
  - **Mô tả**: Tạo tài khoản user mới, gửi email xác thực
  - **UI**: Trang Register (`AuthPage.jsx`)
  - **Service**: `authService.register()`

- [✓] **POST** `/api/v1/users/login` - Đăng nhập
  - **Mô tả**: Đăng nhập bằng email/password, nhận JWT token
  - **UI**: Trang Login (`AuthPage.jsx`)
  - **Service**: `authService.login()`

- [✓] **POST** `/api/v1/users/auth/social/callback` - Đăng nhập Google
  - **Mô tả**: Xác thực Google OAuth và đăng nhập
  - **UI**: Nút "Continue with Google" (`LoginForm.jsx`)
  - **Service**: `authService.loginWithGoogle()`

- [✓] **GET** `/api/v1/users/verify?code={code}` - Xác thực email
  - **Mô tả**: Xác thực tài khoản qua mã code gửi email
  - **UI**: Trang Verify Email (`VerifyEmailPage.jsx`)
  - **Service**: `authService.verifyEmail()`

#### Protected APIs (Cần đăng nhập)
- [✓] **GET** `/api/v1/users/current` - Lấy thông tin user hiện tại
  - **Mô tả**: Lấy profile của user đang đăng nhập
  - **UI**: Profile Page, Header (hiển thị tên/avatar)
  - **Service**: `authService.getCurrentUser()`

- [✓] **PUT** `/api/v1/users/avatar` - Cập nhật avatar
  - **Mô tả**: Upload ảnh đại diện mới
  - **UI**: Profile Page (`ProfilePage.jsx`)
  - **Service**: `authService.updateAvatar()`

**Trạng thái**: ✅ **6/6 hoàn thành (100%)**

---

### 2️⃣ **🔑 Quên Mật Khẩu** (Password Reset)

- [✓] **POST** `/forgot-password?email={email}` - Yêu cầu reset mật khẩu
  - **Mô tả**: Gửi link reset password qua email
  - **UI**: Forgot Password Form (`ForgotPasswordForm.jsx`)
  - **Service**: `authService.forgotPassword()`

- [✓] **POST** `/reset-password` - Đặt lại mật khẩu
  - **Mô tả**: Reset password với token từ email
  - **UI**: Reset Password Page (`ResetPasswordPage.jsx`)
  - **Service**: `authService.resetPassword()`

**Trạng thái**: ✅ **2/2 hoàn thành (100%)**

---

### 3️⃣ **🏪 Xem Shop/Cửa Hàng** (Store Browsing)

#### Public APIs (Không cần đăng nhập)
- [ ] **GET** `/api/v1/stores` - Lấy danh sách tất cả shop
  - **Mô tả**: Xem tất cả shop đang hoạt động
  - **UI**: Trang Stores (`StoresPage.jsx`)
  - **Service**: Chưa implement

- [ ] **GET** `/api/v1/stores/{storeId}` - Xem chi tiết shop
  - **Mô tả**: Xem thông tin chi tiết 1 shop (tên, địa chỉ, logo...)
  - **UI**: Trang Store Detail (`StoreDetailPage.jsx`)
  - **Service**: Chưa implement

- [ ] **GET** `/api/v1/stores/owner/{ownerId}` - Xem shop của 1 người bán
  - **Mô tả**: Lấy tất cả shop của 1 chủ shop cụ thể
  - **UI**: Trang Seller Detail (`SellerDetailPage.jsx`)
  - **Service**: Chưa implement

**Trạng thái**: ⏳ **0/3 hoàn thành (0%)**

---

### 4️⃣ **📦 Xem Sản Phẩm** (Product Browsing)

#### Public APIs (Không cần đăng nhập)
- [✓] **GET** `/api/v1/products?name={name}` - Tìm kiếm sản phẩm
  - **Mô tả**: Tìm sản phẩm theo tên (partial match)
  - **UI**: Search Bar (`SearchBar.jsx`), Search Results (`SearchResults.jsx`)
  - **Service**: `productService.getProducts()`

- [✓] **GET** `/api/v1/products/{id}` - Xem chi tiết sản phẩm
  - **Mô tả**: Lấy thông tin đầy đủ của 1 sản phẩm
  - **UI**: Product Detail Page (`ProductDetail.jsx`)
  - **Service**: `productService.getProductById()`

- [✓] **GET** `/api/v1/products/category/{name}` - Sản phẩm theo danh mục
  - **Mô tả**: Xem tất cả sản phẩm trong 1 category
  - **UI**: Product List (`ProductList.jsx`), Category Filter
  - **Service**: `productService.getProducts()`

- [ ] **GET** `/api/v1/products/category/{category}/brand/{brand}` - Lọc theo category & brand
  - **Mô tả**: Tìm sản phẩm theo cả category và brand
  - **UI**: Search Filters với nhiều điều kiện
  - **Service**: Chưa implement

**Trạng thái**: ✅ **3/4 hoàn thành (75%)**

---

### 5️⃣ **🎨 Xem Biến Thể Sản Phẩm** (Product Variant Browsing)

#### Public APIs (Không cần đăng nhập)
- [✓] **GET** `/api/v1/product-variants/{id}` - Chi tiết biến thể
  - **Mô tả**: Xem thông tin variant cụ thể (giá, màu, size, stock)
  - **UI**: Product Detail (`ProductDetail.jsx`), Cart
  - **Service**: `productService.getProductVariantById()`

- [✓] **GET** `/api/v1/product-variants/latest` - Sản phẩm mới nhất
  - **Mô tả**: Lấy danh sách sản phẩm mới nhất
  - **UI**: Home Page (`HomePage.jsx`) - "New Arrivals"
  - **Service**: `productService.getLatestProductVariants()`

- [✓] **GET** `/api/v1/product-variants/search?name={name}` - Tìm kiếm variant
  - **Mô tả**: Tìm product variant theo tên
  - **UI**: Search Bar, Search Results
  - **Service**: `productService.searchProductVariants()`

- [✓] **GET** `/api/v1/product-variants/product/{productId}` - Tất cả variant của 1 sản phẩm
  - **Mô tả**: Lấy tất cả màu/size của 1 sản phẩm
  - **UI**: Product Detail (chọn màu/size)
  - **Service**: `productService.getProductVariants()`

- [✓] **GET** `/api/v1/product-variants/store/{storeId}` - Sản phẩm của 1 shop
  - **Mô tả**: Xem tất cả sản phẩm của 1 shop cụ thể
  - **UI**: Shop Page (`ShopPage.jsx`)
  - **Service**: `productService.getProductVariantsByStore()`

- [✓] **GET** `/api/v1/product-variants/category/{category}` - Variant theo category
  - **Mô tả**: Lọc product variant theo danh mục
  - **UI**: Category Page, Filters
  - **Service**: `productService.getProductVariantsByCategory()`

- [✓] **GET** `/api/v1/product-variants/category/{category}/brand/{brand}` - Lọc variant theo category & brand
  - **Mô tả**: Lọc chi tiết theo cả category và brand
  - **UI**: Search Filters nâng cao
  - **Service**: `productService.getProductVariantsByCategoryAndBrand()`

**Trạng thái**: ✅ **7/7 hoàn thành (100%)**

---

### 6️⃣ **📁 Danh Mục Sản Phẩm** (Categories)

#### Public APIs (Không cần đăng nhập)
- [✓] **GET** `/api/v1/categories/all` - Lấy tất cả danh mục
  - **Mô tả**: Danh sách đầy đủ categories (không phân trang)
  - **UI**: Home Page sidebar, Search Filters, Product List
  - **Service**: `productService.getCategories()` (có caching)

**Trạng thái**: ✅ **1/1 hoàn thành (100%)**

---

### 7️⃣ **🏷️ Thương Hiệu** (Brands)

#### Public APIs (Không cần đăng nhập)
- [✓] **GET** `/api/v1/brands/all` - Lấy tất cả thương hiệu
  - **Mô tả**: Danh sách đầy đủ brands (không phân trang)
  - **UI**: Trang Brands, Search Filters, Brand Filter
  - **Service**: `productService.getAllBrands()`

**Trạng thái**: ✅ **1/1 hoàn thành (100%)**

---

### 8️⃣ **⭐ Xem Đánh Giá** (Review Management - Public)

#### Protected APIs (Cần đăng nhập để xem chi tiết)
- [ ] **GET** `/api/v1/reviews/{reviewId}` - Chi tiết 1 đánh giá
  - **Mô tả**: Xem thông tin chi tiết của 1 review
  - **UI**: Review Detail Modal
  - **Service**: Chưa implement

- [ ] **GET** `/api/v1/reviews/product/{productId}` - Đánh giá của sản phẩm
  - **Mô tả**: Xem tất cả review của 1 product
  - **UI**: Product Detail - Reviews Section (`ProductReviews.jsx`)
  - **Service**: Chưa implement (đang dùng mock)

- [ ] **GET** `/api/v1/reviews/product-variant/{productVariantId}` - Đánh giá của variant
  - **Mô tả**: Xem review cho variant cụ thể
  - **UI**: Product Detail - Reviews
  - **Service**: Chưa implement (đang dùng mock)

- [ ] **GET** `/api/v1/reviews/product-variant/{productVariantId}/stats` - Thống kê rating
  - **Mô tả**: Số sao trung bình, phân bố rating (5*, 4*, 3*...)
  - **UI**: Product Detail - Rating Summary
  - **Service**: Chưa implement

- [ ] **GET** `/api/v1/reviews/my-reviews` - Xem review của tôi
  - **Mô tả**: Danh sách tất cả review mà user đã viết
  - **UI**: Profile Page - My Reviews Tab
  - **Service**: Chưa implement

**Trạng thái**: ⏳ **0/5 hoàn thành (0%)**

---

### 9️⃣ **🎁 Khuyến Mãi Công Khai** (Public Promotions)

#### Public APIs (Không cần đăng nhập)
- [ ] **GET** `/api/v1/promotions/{promotionId}` - Chi tiết khuyến mãi
  - **Mô tả**: Xem thông tin chi tiết 1 promotion
  - **UI**: Promotion Detail Modal/Page
  - **Service**: Chưa implement

- [ ] **GET** `/api/v1/promotions/active` - Tất cả khuyến mãi đang active
  - **Mô tả**: Danh sách promotion đang có hiệu lực
  - **UI**: Home Page - Promotions Banner
  - **Service**: Chưa implement

- [ ] **GET** `/api/v1/promotions/platform` - Khuyến mãi từ platform
  - **Mô tả**: Promotion toàn sàn (do admin tạo)
  - **UI**: Home Page - Platform Deals
  - **Service**: Chưa implement

- [ ] **GET** `/api/v1/promotions/store/{storeId}` - Khuyến mãi của shop
  - **Mô tả**: Tất cả promotion của 1 shop cụ thể
  - **UI**: Shop Page - Store Promotions
  - **Service**: Chưa implement

- [ ] **GET** `/api/v1/promotions/active/store/{storeId}` - Khuyến mãi đang active của shop
  - **Mô tả**: Chỉ những promotion đang có hiệu lực của shop
  - **UI**: Shop Page - Active Deals
  - **Service**: Chưa implement

- [ ] **GET** `/api/v1/promotions/type/{type}` - Khuyến mãi theo loại
  - **Mô tả**: Lọc theo loại (PERCENTAGE, FIXED_AMOUNT...)
  - **UI**: Promotions Page với filter
  - **Service**: Chưa implement

- [ ] **GET** `/api/v1/promotions/validate/{promotionId}` - Kiểm tra khuyến mãi có áp dụng được không
  - **Mô tả**: Check promotion có hợp lệ với order không
  - **UI**: Checkout Page - Apply Coupon
  - **Service**: Chưa implement

- [ ] **GET** `/api/v1/promotions/calculate-discount/{promotionId}` - Tính số tiền giảm
  - **Mô tả**: Tính toán discount amount cho order
  - **UI**: Checkout Page - Discount Preview
  - **Service**: Chưa implement

**Trạng thái**: ⏳ **0/8 hoàn thành (0%)**

---

### 🔟 **📍 Quản Lý Địa Chỉ Giao Hàng** (Buyer Address Management)

#### Protected APIs (Cần đăng nhập)
- [✓] **GET** `/api/v1/buyer/address` - Lấy danh sách địa chỉ
  - **Mô tả**: Xem tất cả địa chỉ giao hàng đã lưu
  - **UI**: Checkout Page - AddressSelector component
  - **Service**: `addressService.getUserAddresses()`

- [✓] **GET** `/api/v1/buyer/address/check` - Kiểm tra có địa chỉ chưa
  - **Mô tả**: Check user đã có địa chỉ hay chưa
  - **UI**: Checkout validation
  - **Service**: `addressService.checkHasAddress()`

- [✓] **POST** `/api/v1/buyer/address` - Thêm địa chỉ mới
  - **Mô tả**: Tạo địa chỉ giao hàng mới
  - **UI**: AddressSelector - Add New Address Form
  - **Service**: `addressService.createAddress()`

- [✓] **PUT** `/api/v1/buyer/address/{addressId}` - Sửa địa chỉ
  - **Mô tả**: Cập nhật thông tin địa chỉ
  - **UI**: AddressSelector - Edit button
  - **Service**: `addressService.updateAddress()`

- [✓] **DELETE** `/api/v1/buyer/address/{addressId}` - Xóa địa chỉ
  - **Mô tả**: Xóa 1 địa chỉ đã lưu
  - **UI**: AddressSelector - Delete button
  - **Service**: `addressService.deleteAddress()`

**Trạng thái**: ✅ **5/5 hoàn thành (100%)**

---

### 1️⃣1️⃣ **🛒 Quản Lý Giỏ Hàng** (Buyer Cart Management)

#### Protected APIs (Cần đăng nhập)
- [✓] **GET** `/api/v1/buyer/cart` - Xem giỏ hàng
  - **Mô tả**: Lấy tất cả sản phẩm trong giỏ
  - **UI**: Cart Page (`CartPage.jsx`)
  - **Service**: `cartService.getCart()`

- [✓] **GET** `/api/v1/buyer/cart/count` - Đếm số sản phẩm trong giỏ
  - **Mô tả**: Số lượng items để hiển thị badge
  - **UI**: Header - Cart Icon Badge
  - **Service**: `cartService.getCartCount()`

- [✓] **POST** `/api/v1/buyer/cart/add` - Thêm vào giỏ
  - **Mô tả**: Thêm 1 hoặc nhiều sản phẩm vào giỏ
  - **UI**: Product Detail - Add to Cart Button
  - **Service**: `cartService.addToCart()`

- [✓] **PUT** `/api/v1/buyer/cart/{productVariantId}` - Cập nhật số lượng
  - **Mô tả**: Thay đổi quantity của item trong giỏ
  - **UI**: Cart Page - Quantity Input
  - **Service**: `cartService.updateCartItem()`

- [✓] **DELETE** `/api/v1/buyer/cart/{productVariantId}` - Xóa khỏi giỏ
  - **Mô tả**: Xóa 1 item cụ thể
  - **UI**: Cart Page - Remove Button
  - **Service**: `cartService.removeFromCart()`

- [✓] **DELETE** `/api/v1/buyer/cart/clear` - Xóa toàn bộ giỏ hàng
  - **Mô tả**: Clear cart (xóa tất cả)
  - **UI**: Cart Page - Clear Cart Button
  - **Service**: `cartService.clearCart()`

**Trạng thái**: ✅ **6/6 hoàn thành (100%)**

---

### 1️⃣2️⃣ **📋 Quản Lý Đơn Hàng** (Buyer Order Management)

#### Protected APIs (Cần đăng nhập)
- [ ] **GET** `/api/v1/buyer/orders` - Lịch sử đơn hàng
  - **Mô tả**: Xem tất cả đơn đã đặt (có filter theo status)
  - **UI**: Orders Page (`OrdersPage.jsx`)
  - **Service**: Chưa implement (đang dùng mock)

- [ ] **GET** `/api/v1/buyer/orders/{orderId}` - Chi tiết đơn hàng
  - **Mô tả**: Xem thông tin chi tiết 1 order
  - **UI**: Order Detail Modal
  - **Service**: Chưa implement (đang dùng mock)

- [ ] **POST** `/api/v1/buyer/orders/checkout` - Thanh toán/Tạo đơn
  - **Mô tả**: Checkout giỏ hàng thành order
  - **UI**: Checkout Page (`CheckoutPage.jsx`) - Place Order Button
  - **Service**: Chưa implement

- [ ] **PUT** `/api/v1/buyer/orders/{orderId}/cancel` - Hủy đơn hàng
  - **Mô tả**: Hủy order (chỉ khi status = PENDING)
  - **UI**: Orders Page - Cancel Button
  - **Service**: Chưa implement

**Trạng thái**: ⏳ **0/4 hoàn thành (0%)** - *Hiện đang dùng mock data*

---

### 1️⃣3️⃣ **💬 Viết Đánh Giá** (Buyer Review Management)

#### Protected APIs (Cần đăng nhập)
- [ ] **GET** `/api/v1/buyer/reviews/my-reviews` - Xem review của tôi
  - **Mô tả**: Danh sách review mà user đã viết
  - **UI**: Profile Page - My Reviews Tab
  - **Service**: Chưa implement (đang dùng mock)

- [ ] **POST** `/api/v1/buyer/reviews` - Viết đánh giá mới
  - **Mô tả**: Tạo review cho sản phẩm đã mua
  - **UI**: Orders Page - Review Button, Review Form Modal
  - **Service**: Chưa implement (đang dùng mock)

- [ ] **PUT** `/api/v1/buyer/reviews/{reviewId}` - Sửa đánh giá
  - **Mô tả**: Chỉnh sửa review đã viết
  - **UI**: My Reviews - Edit Button
  - **Service**: Chưa implement

- [ ] **DELETE** `/api/v1/buyer/reviews/{reviewId}` - Xóa đánh giá
  - **Mô tả**: Xóa review của mình
  - **UI**: My Reviews - Delete Button
  - **Service**: Chưa implement

**Trạng thái**: ⏳ **0/4 hoàn thành (0%)** - *Hiện đang dùng mock data*

---

## 📊 Tổng Kết Progress

### ✅ Hoàn Thành (Completed)
```
1. 👤 User Management          ██████████ 100% (6/6)
2. 🔑 Password Reset           ██████████ 100% (2/2)
3. 📁 Categories               ██████████ 100% (1/1)
4. 📦 Xem Sản Phẩm             ███████░░░  75% (3/4)
5. 🎨 Xem Biến Thể Sản Phẩm    ██████████ 100% (7/7)
6. 🏷️ Brands                   ██████████ 100% (1/1)
7. 📍 Address Management       ██████████ 100% (5/5)
```

### ⏳ Chưa Hoàn Thành (Pending)
```
8. 🏪 Xem Shop                 ░░░░░░░░░░   0% (0/3)
9. ⭐ Review Management        ░░░░░░░░░░   0% (0/5)
10. 🎁 Public Promotions       ░░░░░░░░░░   0% (0/8)
11. 🛒 Cart Management         ██████████ 100% (6/6)
12. 📋 Order Management        ░░░░░░░░░░   0% (0/4) *
13. 💬 Buyer Reviews           ░░░░░░░░░░   0% (0/4) *
```

*\* Đang dùng mock data*

---

## 📈 Thống Kê Tổng Thể

| Trạng thái | Số lượng | Phần trăm |
|-----------|----------|-----------|
| ✅ Hoàn thành | 31 APIs | 55% |
| ⏳ Chưa hoàn thành | 25 APIs | 45% |
| **Tổng cộng** | **56 APIs** | **100%** |

**Progress Bar:** █████░░░░░ 55%

---

## 🎯 Ưu Tiên Tiếp Theo (Next Steps)

### 🔥 HIGH PRIORITY (Cần ngay)
1. **🛒 Cart Management** (6 APIs) - Đang dùng localStorage, cần sync với backend
2. **📋 Order Management** (4 APIs) - Core feature, cần cho checkout flow
3. **📍 Address Management** (5 APIs) - Cần cho checkout

### 🔶 MEDIUM PRIORITY (Quan trọng)
4. **💬 Buyer Reviews** (4 APIs) - Tăng trust & engagement
5. **⭐ Review Management** (5 APIs) - Hiển thị reviews cho sản phẩm
6. **🎁 Public Promotions** (8 APIs) - Tăng conversion rate

### 🔹 LOW PRIORITY (Có thể làm sau)
7. **🏪 Xem Shop** (3 APIs) - Nice to have
8. **🏷️ Brands** (1 API) - Filter nâng cao
9. **Hoàn thiện 2 API còn lại** của Product/Variant Browsing

---

## 📝 Ghi Chú Kỹ Thuật

### ✅ Các Service Đã Implement
- **authService.js** - User Management & Password Reset APIs ✓
- **productService.js** - Product, Variant, Category Browsing APIs ✓

### ⚠️ Các Service Đang Dùng Mock/LocalStorage
- **CartContext.jsx** - Giỏ hàng (localStorage)
- **reviewService.js** - Reviews (mock data)
- **userService.js** - Order history, profile (mock data)

### 🔧 Authentication
- Sử dụng JWT token tự động gắn vào header qua `axios.interceptors`
- Token được lưu trong `localStorage`
- Auto-refresh user data khi mount `AuthContext`

### 📦 Pagination
Các API có phân trang thường dùng params:
- `page`: Số trang (0 hoặc 1-based)
- `size`: Số items/trang (default: 10)
- `sortBy`: Trường sắp xếp
- `sortDir`: Hướng sắp xếp (asc/desc)

---

## 🚀 Roadmap

### Phase 1: Core User Features (Đang làm)
- [x] Authentication & User Management
- [x] Xem & Tìm Kiếm Sản Phẩm
- [ ] Cart Management (Real API)
- [ ] Checkout & Orders
- [ ] Address Management

### Phase 2: Engagement Features
- [ ] Reviews & Ratings
- [ ] Promotions & Discounts
- [ ] Order Tracking

### Phase 3: Enhanced Experience
- [ ] Xem Shop & Seller
- [ ] Lọc Theo Thương Hiệu
- [ ] Tìm Kiếm Nâng Cao

---

**Tạo bởi:** AI Assistant  
**Ngày tạo:** November 1, 2025  
**Cập nhật lần cuối:** November 1, 2025  

---

## 📞 API Base URLs

### Production
```
https://e-commerce-raq1.onrender.com
```

### Local Development
```
http://localhost:8080
```

### Test API
Sử dụng Swagger UI tại:
```
https://e-commerce-raq1.onrender.com/swagger-ui/index.html
```

---

**🎯 MỤC TIÊU: Hoàn thành 100% APIs cho USER để launch MVP!** 🚀

