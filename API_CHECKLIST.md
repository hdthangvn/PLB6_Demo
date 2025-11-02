# 📋 API Implementation Checklist

**E-Commerce TechShop API Documentation**  
**Base URL (Production):** `https://e-commerce-raq1.onrender.com`  
**Base URL (Local):** `http://localhost:8080`

---

## 🔐 Authentication
Hầu hết các API yêu cầu **Bearer Token** trong header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 📊 API Groups Overview

- [User Management](#-user-management) - 6 APIs
- [Password Reset](#-password-reset) - 2 APIs
- [Category Management](#-category-management) - 9 APIs
- [Brand Management](#-brand-management) - 9 APIs
- [Store Browsing](#-store-browsing) - 3 APIs
- [Product Browsing](#-product-browsing) - 4 APIs
- [Product Variant Browsing](#-product-variant-browsing) - 7 APIs
- [Review Management](#-review-management) - 5 APIs
- [Public Promotion APIs](#-public-promotion-apis) - 8 APIs
- [Buyer Address Management](#-buyer-address-management) - 5 APIs
- [Buyer Cart Management](#-buyer-cart-management) - 6 APIs
- [Buyer Order Management](#-buyer-order-management) - 3 APIs
- [Buyer Review Management](#-buyer-review-management) - 4 APIs
- [B2C Store Management](#-b2c-store-management) - 8 APIs
- [B2C Product Management](#-b2c-product-management) - 2 APIs
- [B2C Product Variant Management](#-b2c-product-variant-management) - 7 APIs
- [B2C Promotion Management](#-b2c-promotion-management) - 7 APIs
- [B2C Order Management](#-b2c-order-management) - 8 APIs
- [B2C Analytics](#-b2c-analytics) - 17 APIs
- [Admin Store Management](#-admin-store-management) - 5 APIs
- [Admin Product Management](#-admin-product-management) - 3 APIs
- [Admin ProductVariant Management](#-admin-productvariant-management) - 3 APIs
- [Admin Promotion Management](#-admin-promotion-management) - 13 APIs

**Total APIs:** ~140+ endpoints

---

## 👤 User Management

### Public APIs (No Auth Required)
- [✓] **POST** `/api/v1/users/register` - User registration
- [✓] **POST** `/api/v1/users/login` - User login
- [] **POST** `/api/v1/users/auth/social/callback` - Google OAuth callback
- [✓] **GET** `/api/v1/users/verify?code={code}` - Verify user email

### Protected APIs (Auth Required)
- [✓] **GET** `/api/v1/users/current` - Get current user profile
- [✓] **PUT** `/api/v1/users/avatar` - Update user avatar

---

## 🔑 Password Reset

- [✓] **POST** `/forgot-password?email={email}` - Request password reset
- [✓] **POST** `/reset-password` - Reset password with token

---

## 📁 Category Management

### Public APIs
- [✓] **GET** `/api/v1/categories/all` - Get all categories (no pagination)

### Protected APIs
- [✓] **GET** `/api/v1/categories` - Get all categories with pagination
- [✓] **GET** `/api/v1/categories/{id}` - Get category by ID
- [ ] **GET** `/api/v1/categories/name/{name}` - Get category by name
- [ ] **GET** `/api/v1/categories/{id}/exists` - Check if category exists by ID
- [ ] **GET** `/api/v1/categories/name/{name}/exists` - Check if category exists by name
- [ ] **POST** `/api/v1/categories` - Create new category
- [ ] **PUT** `/api/v1/categories/{id}` - Update category
- [ ] **DELETE** `/api/v1/categories/{id}` - Delete category

---

## 🏷️ Brand Management

### Public APIs
- [ ] **GET** `/api/v1/brands/all` - Get all brands (no pagination)

### Protected APIs
- [✓] **GET** `/api/v1/brands` - Get all brands with pagination
- [✓] **GET** `/api/v1/brands/{id}` - Get brand by ID
- [ ] **GET** `/api/v1/brands/name/{name}` - Get brand by name
- [ ] **GET** `/api/v1/brands/{id}/exists` - Check if brand exists by ID
- [ ] **GET** `/api/v1/brands/name/{name}/exists` - Check if brand exists by name
- [ ] **POST** `/api/v1/brands` - Create new brand
- [ ] **PUT** `/api/v1/brands/{id}` - Update brand
- [ ] **DELETE** `/api/v1/brands/{id}` - Delete brand

---

## 🏪 Store Browsing

### Public APIs (No Auth Required)
- [ ] **GET** `/api/v1/stores` - Get all stores
- [ ] **GET** `/api/v1/stores/{storeId}` - Get store by ID
- [ ] **GET** `/api/v1/stores/owner/{ownerId}` - Get stores by owner

---

## 📦 Product Browsing

### Public APIs (No Auth Required)
- [✓] **GET** `/api/v1/products` - Search products by name
- [✓] **GET** `/api/v1/products/{id}` - Get product by ID
- [✓] **GET** `/api/v1/products/category/{name}` - Get products by category
- [ ] **GET** `/api/v1/products/category/{category}/brand/{brand}` - Get products by category and brand

---

## 🎨 Product Variant Browsing

### Public APIs (No Auth Required)
- [✓] **GET** `/api/v1/product-variants/{id}` - Get product variant by ID
- [✓] **GET** `/api/v1/product-variants/latest` - Get latest product variants
- [✓] **GET** `/api/v1/product-variants/search` - Search product variants by name
- [✓] **GET** `/api/v1/product-variants/product/{productId}` - Get all variants of a product
- [✓] **GET** `/api/v1/product-variants/store/{storeId}` - Get product variants by store
- [✓] **GET** `/api/v1/product-variants/category/{category}` - Get product variants by category
- [ ] **GET** `/api/v1/product-variants/category/{category}/brand/{brand}` - Get product variants by category and brand

---

## ⭐ Review Management

### Protected APIs
- [ ] **GET** `/api/v1/reviews/{reviewId}` - Get review by ID
- [ ] **GET** `/api/v1/reviews/product/{productId}` - Get reviews by product
- [ ] **GET** `/api/v1/reviews/product-variant/{productVariantId}` - Get reviews by product variant
- [ ] **GET** `/api/v1/reviews/product-variant/{productVariantId}/stats` - Get product rating statistics
- [ ] **GET** `/api/v1/reviews/my-reviews` - Get my reviews

---

## 🎁 Public Promotion APIs

### Public APIs (No Auth Required)
- [ ] **GET** `/api/v1/promotions/{promotionId}` - Get promotion by ID
- [ ] **GET** `/api/v1/promotions/active` - Get all active promotions
- [ ] **GET** `/api/v1/promotions/platform` - Get all platform promotions
- [ ] **GET** `/api/v1/promotions/store/{storeId}` - Get promotions by store
- [ ] **GET** `/api/v1/promotions/active/store/{storeId}` - Get active promotions by store
- [ ] **GET** `/api/v1/promotions/type/{type}` - Get promotions by type
- [ ] **GET** `/api/v1/promotions/validate/{promotionId}` - Validate promotion
- [ ] **GET** `/api/v1/promotions/calculate-discount/{promotionId}` - Calculate discount amount

---

## 📍 Buyer Address Management

### Protected APIs
- [ ] **GET** `/api/v1/buyer/address` - Get user addresses
- [ ] **GET** `/api/v1/buyer/address/check` - Check if user has address
- [ ] **POST** `/api/v1/buyer/address` - Create new address
- [ ] **PUT** `/api/v1/buyer/address/{addressId}` - Update address
- [ ] **DELETE** `/api/v1/buyer/address/{addressId}` - Delete address

---

## 🛒 Buyer Cart Management

### Protected APIs
- [ ] **GET** `/api/v1/buyer/cart` - Get shopping cart
- [ ] **GET** `/api/v1/buyer/cart/count` - Get cart item count
- [ ] **POST** `/api/v1/buyer/cart/add` - Add products to cart
- [ ] **PUT** `/api/v1/buyer/cart/{productVariantId}` - Update cart item quantity
- [ ] **DELETE** `/api/v1/buyer/cart/{productVariantId}` - Remove item from cart
- [ ] **DELETE** `/api/v1/buyer/cart/clear` - Clear entire cart

---

## 📋 Buyer Order Management

### Protected APIs
- [ ] **GET** `/api/v1/buyer/orders` - Get order history
- [ ] **GET** `/api/v1/buyer/orders/{orderId}` - Get order detail
- [ ] **POST** `/api/v1/buyer/orders/checkout` - Checkout and create order
- [ ] **PUT** `/api/v1/buyer/orders/{orderId}/cancel` - Cancel order

---

## 💬 Buyer Review Management

### Protected APIs
- [ ] **GET** `/api/v1/buyer/reviews/my-reviews` - Get my reviews
- [ ] **POST** `/api/v1/buyer/reviews` - Create product review
- [ ] **PUT** `/api/v1/buyer/reviews/{reviewId}` - Update review
- [ ] **DELETE** `/api/v1/buyer/reviews/{reviewId}` - Delete review

---

## 🏢 B2C Store Management

### Protected APIs
- [ ] **GET** `/api/v1/b2c/stores/my-stores` - Get my stores
- [ ] **POST** `/api/v1/b2c/stores/create` - Create new store
- [ ] **PUT** `/api/v1/b2c/stores/{storeId}` - Update store information
- [ ] **PUT** `/api/v1/b2c/stores/{storeId}/logo` - Update store logo
- [ ] **PUT** `/api/v1/b2c/stores/{storeId}/banner` - Update store banner
- [ ] **PUT** `/api/v1/b2c/stores/{storeId}/approve` - Approve store (Admin)
- [ ] **PUT** `/api/v1/b2c/stores/{storeId}/reject` - Reject store (Admin)
- [ ] **DELETE** `/api/v1/b2c/stores/{storeId}` - Soft delete store

---

## 📦 B2C Product Management

### Protected APIs
- [ ] **POST** `/api/v1/b2c/products/create` - Create new product
- [ ] **PUT** `/api/v1/b2c/products/update/{id}` - Update existing product

---

## 🎨 B2C Product Variant Management

### Protected APIs
- [ ] **POST** `/api/v1/b2c/product-variants/create` - Create product variant
- [ ] **POST** `/api/v1/b2c/product-variants/create-without-image` - Create product variant without images
- [ ] **POST** `/api/v1/b2c/product-variants/add-colors/{id}` - Add color option to product variant
- [ ] **PUT** `/api/v1/b2c/product-variants/update-price/{id}` - Update product variant price
- [ ] **PUT** `/api/v1/b2c/product-variants/update-stock/{id}` - Update product variant stock
- [ ] **PUT** `/api/v1/b2c/product-variants/update-colors/{id}/color/{colorId}` - Update specific color option
- [ ] **DELETE** `/api/v1/b2c/product-variants/delete/{id}` - Delete product variant

---

## 🎁 B2C Promotion Management

### Protected APIs
- [ ] **GET** `/api/v1/b2c/promotions/{promotionId}` - Get promotion by ID
- [ ] **POST** `/api/v1/b2c/promotions/store/{storeId}` - Create store promotion
- [ ] **POST** `/api/v1/b2c/promotions/{promotionId}/calculate-discount` - Calculate discount amount
- [ ] **PUT** `/api/v1/b2c/promotions/{promotionId}` - Update promotion
- [ ] **PUT** `/api/v1/b2c/promotions/{promotionId}/activate` - Activate promotion
- [ ] **PUT** `/api/v1/b2c/promotions/{promotionId}/deactivate` - Deactivate promotion
- [ ] **DELETE** `/api/v1/b2c/promotions/{promotionId}` - Delete promotion

---

## 📦 B2C Order Management

### Protected APIs
- [ ] **GET** `/api/v1/b2c/orders` - Get store orders
- [ ] **GET** `/api/v1/b2c/orders/{orderId}` - Get store order detail
- [ ] **GET** `/api/v1/b2c/orders/statistics` - Get order statistics
- [ ] **GET** `/api/v1/b2c/orders/revenue` - Get revenue statistics
- [ ] **PUT** `/api/v1/b2c/orders/{orderId}/status` - Update order status
- [ ] **PUT** `/api/v1/b2c/orders/{orderId}/confirm` - Confirm order
- [ ] **PUT** `/api/v1/b2c/orders/{orderId}/ship` - Ship order
- [ ] **PUT** `/api/v1/b2c/orders/{orderId}/deliver` - Deliver order
- [ ] **PUT** `/api/v1/b2c/orders/{orderId}/cancel` - Cancel order

---

## 📊 B2C Analytics

### Protected APIs

#### Dashboard & Overview
- [ ] **GET** `/api/v1/b2c/analytics/dashboard/{storeId}` - Get dashboard analytics
- [ ] **GET** `/api/v1/b2c/analytics/performance/{storeId}` - Get performance metrics

#### Revenue Analytics
- [ ] **GET** `/api/v1/b2c/analytics/revenue/{storeId}` - Get revenue analytics
- [ ] **GET** `/api/v1/b2c/analytics/revenue/{storeId}/date-range` - Get revenue by date range

#### Sales Analytics
- [ ] **GET** `/api/v1/b2c/analytics/sales/{storeId}/trend` - Get sales trend
- [ ] **GET** `/api/v1/b2c/analytics/sales/{storeId}/category` - Get sales by category

#### Product Analytics
- [ ] **GET** `/api/v1/b2c/analytics/products/{storeId}` - Get product analytics
- [ ] **GET** `/api/v1/b2c/analytics/products/{storeId}/top` - Get top products

#### Order Analytics
- [ ] **GET** `/api/v1/b2c/analytics/orders/{storeId}` - Get order analytics
- [ ] **GET** `/api/v1/b2c/analytics/orders/{storeId}/status` - Get order status analytics

#### Review Analytics
- [ ] **GET** `/api/v1/b2c/analytics/reviews/{storeId}` - Get review analytics
- [ ] **GET** `/api/v1/b2c/analytics/reviews/{storeId}/rating-distribution` - Get rating distribution
- [ ] **GET** `/api/v1/b2c/analytics/reviews/{storeId}/pending` - Get pending reviews analytics

#### Customer Analytics
- [ ] **GET** `/api/v1/b2c/analytics/customers/{storeId}` - Get customer analytics
- [ ] **GET** `/api/v1/b2c/analytics/customers/{storeId}/top` - Get top customers
- [ ] **GET** `/api/v1/b2c/analytics/customers/{storeId}/growth` - Get customer growth analytics

#### Inventory Analytics
- [ ] **GET** `/api/v1/b2c/analytics/inventory/{storeId}` - Get inventory analytics

---

## 🛡️ Admin Store Management

### Protected APIs (Admin Only)
- [ ] **GET** `/api/v1/admin/stores/pending` - Get pending stores
- [ ] **GET** `/api/v1/admin/stores/approved` - Get approved stores
- [ ] **PUT** `/api/v1/admin/stores/{storeId}/status` - Update store status
- [ ] **PUT** `/api/v1/admin/stores/{storeId}/approve` - Approve store
- [ ] **PUT** `/api/v1/admin/stores/{storeId}/reject` - Reject store
- [ ] **DELETE** `/api/v1/admin/stores/{storeId}` - Soft delete store

---

## 🛡️ Admin Product Management

### Protected APIs (Admin Only)
- [ ] **GET** `/api/v1/admin/products/pending` - Get all pending products
- [ ] **PUT** `/api/v1/admin/products/{productId}/approve` - Approve product
- [ ] **PUT** `/api/v1/admin/products/{productId}/reject` - Reject product

---

## 🛡️ Admin ProductVariant Management

### Protected APIs (Admin Only)
- [ ] **GET** `/api/v1/admin/product-variants/pending` - Get all pending product variants
- [ ] **PUT** `/api/v1/admin/product-variants/{variantId}/approve` - Approve product variant
- [ ] **PUT** `/api/v1/admin/product-variants/{variantId}/reject` - Reject product variant

---

## 🛡️ Admin Promotion Management

### Protected APIs (Admin Only)

#### Management
- [ ] **GET** `/api/v1/admin/promotions` - Get all promotions
- [ ] **GET** `/api/v1/admin/promotions/{promotionId}` - Get promotion by ID
- [ ] **GET** `/api/v1/admin/promotions/store/{storeId}` - Get promotions by store
- [ ] **POST** `/api/v1/admin/promotions/platform` - Create platform promotion
- [ ] **PUT** `/api/v1/admin/promotions/platform/{promotionId}` - Update platform promotion
- [ ] **PUT** `/api/v1/admin/promotions/{promotionId}/activate` - Activate promotion
- [ ] **PUT** `/api/v1/admin/promotions/{promotionId}/deactivate` - Deactivate promotion
- [ ] **DELETE** `/api/v1/admin/promotions/{promotionId}` - Delete promotion

#### Reports
- [ ] **GET** `/api/v1/admin/promotions/reports/active` - Get active platform promotions
- [ ] **GET** `/api/v1/admin/promotions/reports/inactive` - Get inactive platform promotions
- [ ] **GET** `/api/v1/admin/promotions/reports/expired` - Get expired platform promotions
- [ ] **GET** `/api/v1/admin/promotions/reports/deleted` - Get deleted platform promotions
- [ ] **GET** `/api/v1/admin/promotions/reports/type/{type}` - Get promotions by type

---

## 📝 Notes

### Implementation Details

#### ✅ **Implemented Services:**
1. **authService.js** - User authentication & management
   - All User Management APIs ✓
   - Password Reset APIs ✓
   - Avatar upload ✓

2. **productService.js** - Product & catalog APIs
   - Product browsing ✓
   - Product variants browsing ✓
   - Categories fetching ✓
   - Brands fetching ✓
   - Search functionality ✓

3. **categoryService.js** - Category management
   - Get all categories ✓

#### ⚠️ **Mock/LocalStorage Services:**
- **CartContext.jsx** - Using localStorage (no real API)
- **reviewService.js** - Using mock data
- **userService.js** - Using mock data

### Authentication
- Sử dụng JWT token trong header: `Authorization: Bearer <token>`
- Token nhận được sau khi login hoặc register
- Token tự động gắn vào mọi request qua axios interceptor

### Pagination Parameters
- `page`: Page number (thường bắt đầu từ 0 hoặc 1)
- `size`: Number of items per page (default: 10)
- `sortBy`: Sort field (default: "createdAt")
- `sortDir` hoặc `sortDirection`: Sort direction ("asc" hoặc "desc")

### Common Response Format
```json
{
  "success": true,
  "data": { ... },
  "error": null
}
```

### API Base URLs
- **Production**: `https://e-commerce-raq1.onrender.com`
- **Local**: `http://localhost:8080`

### Features Implemented
- ✅ User authentication (Login/Register/Google OAuth)
- ✅ Email verification
- ✅ Password reset
- ✅ Avatar upload
- ✅ Product browsing & search
- ✅ Product variants with colors/sizes
- ✅ Category & Brand filtering
- ✅ Cart management (localStorage)
- ✅ Responsive UI with Tailwind CSS

---

## 🔄 Update History

| Date | Updated By | Changes |
|------|-----------|---------|
| 2025-11-01 | System | Initial checklist created |
| 2025-11-01 | System | ✅ Checked and marked 22 completed APIs |
|  |  | - User Management: 6/6 completed |
|  |  | - Password Reset: 2/2 completed |
|  |  | - Product Browsing: 3/4 completed |
|  |  | - Product Variant Browsing: 6/7 completed |
|  |  | - Category Management: 3/9 completed |
|  |  | - Brand Management: 2/9 completed |

---

## 📌 Progress Summary

```
Total APIs: ~140+
Completed: 22
In Progress: 0
Remaining: 118+
```

**Progress:** ██░░░░░░░░ 16%

### ✅ Completed Groups:
- **User Management**: 6/6 (100%)
- **Password Reset**: 2/2 (100%)
- **Product Variant Browsing**: 6/7 (86%)
- **Product Browsing**: 3/4 (75%)
- **Category Management**: 3/9 (33%)
- **Brand Management**: 2/9 (22%)

### 🚧 In Progress Groups:
- Store Browsing
- Review Management
- Buyer Cart Management
- Buyer Order Management

### 📝 Pending Groups:
- All B2C APIs (Store, Product, Variant, Promotion, Order, Analytics)
- All Admin APIs (Store, Product, Variant, Promotion)
- All Buyer APIs (Address, Review, Cart, Order)

---

**Last Updated:** November 1, 2025

