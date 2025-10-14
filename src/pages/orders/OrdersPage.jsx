import MainLayout from '../../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile';
import { useEffect, useState } from 'react';
import ReviewForm from '../../components/products/ReviewForm';
import { productService } from '../../services/productService';

const OrdersPage = () => {
  const navigate = useNavigate();
  const { orderHistory, updateOrderStatus } = useProfile();
  const [enriched, setEnriched] = useState([]);
  const [reviewingItem, setReviewingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Enrich items with product image and shop info
  useEffect(() => {
    const load = async () => {
      const orders = await Promise.all((orderHistory || []).map(async (o) => {
        const items = await Promise.all((o.items || []).map(async (it) => {
          const detail = await productService.getProductById(it.productId);
          const p = detail.success ? detail.data : null;
          return {
            ...it,
            image: p?.image || '📦',
            shop: p?.shop || { id: 'default', name: 'Shop chính hãng' }
          };
        }));
        return { ...o, items };
      }));
      setEnriched(orders);
    };
    load();
  }, [orderHistory]);

  return (
    <MainLayout>
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <button onClick={()=>navigate('/')} className="text-gray-500 hover:text-gray-700">Trang chủ</button>
              </li>
              <li>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </li>
              <li>
                <span className="text-gray-900 font-medium">Lịch sử đơn hàng</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Lịch sử đơn hàng</h1>
        {enriched && enriched.length > 0 ? (
          <div className="space-y-4">
            {enriched.map((o) => (
              <div key={o.id} className="bg-white border rounded-lg">
                {/* Header status row */}
                <div className="flex items-center justify-between px-4 py-3 border-b">
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <span className="font-semibold">{o.id}</span>
                    <span className="text-gray-400">•</span>
                    <span>{new Date(o.date).toLocaleString('vi-VN')}</span>
                  </div>
                  <div className={`flex items-center space-x-2 font-medium ${o.status==='completed'?'text-green-600':'text-orange-600'}`}>
                    {o.status==='completed' ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"/></svg>
                    )}
                    <span>{o.status === 'completed' ? 'Hoàn thành' : 'Chờ giao hàng'}</span>
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y">
                  {o.items?.map((it, idx) => (
                    <div key={idx} className="p-4">
                      {/* Shop row if available */}
                      {it.shop?.name && (
                        <div className="flex items-center justify-between text-sm mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-0.5 text-xs rounded bg-red-100 text-red-600">Yêu thích</span>
                            <button onClick={()=>it.shop?.id && navigate(`/shop/${it.shop.id}`)} className="font-semibold hover:text-blue-600">{it.shop.name}</button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button onClick={()=>alert('Tính năng chat sẽ có sau.')} className="px-3 py-1.5 bg-orange-500 text-white rounded hover:bg-orange-600">Chat</button>
                            <button onClick={()=>it.shop?.id && navigate(`/shop/${it.shop.id}`)} className="px-3 py-1.5 bg-white border rounded text-gray-700 hover:bg-gray-50">Xem Shop</button>
                            <button onClick={()=>it.shop?.id && navigate(`/shop/${it.shop.id}`)} className="px-3 py-1.5 bg-white border rounded text-gray-700 hover:bg-gray-50">Chi tiết shop</button>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div
                          className="flex items-center space-x-3 min-w-0 cursor-pointer hover:bg-gray-50 rounded p-1"
                          onClick={() => navigate(`/product/${it.productId}`)}
                          title="Xem chi tiết sản phẩm"
                        >
                          <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                            {typeof it.image === 'string' && it.image.startsWith('http') ? (
                              <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-2xl">{it.image}</span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium truncate max-w-md">{it.name}</div>
                            <div className="text-sm text-gray-500">x{it.quantity}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-red-600">{(it.price * it.quantity).toLocaleString('vi-VN')}đ</div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between mt-3">
                        {o.status==='completed' ? (
                          <div className="text-sm text-gray-500">Đánh giá sản phẩm trước {new Date(Date.now()+7*24*60*60*1000).toLocaleDateString('vi-VN')}</div>
                        ) : (
                          <div className="text-sm text-gray-500">Vui lòng nhấn "Đã nhận được hàng" khi đơn đã giao</div>
                        )}
                        <div className="flex items-center space-x-2">
                          {o.status!=='completed' ? (
                            <>
                              <button onClick={()=>updateOrderStatus(o.id,'completed')} className="px-4 py-2 bg-white border border-orange-500 text-orange-600 rounded hover:bg-orange-50">Đã nhận được hàng</button>
                              <button onClick={()=>alert('Liên hệ người bán: tính năng chat/điện thoại sẽ tích hợp sau.')} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Liên Hệ Người Bán</button>
                            </>
                          ) : (
                            <>
                              <button className="px-4 py-2 bg-white border rounded hover:bg-gray-50">Yêu Cầu Trả Hàng/Hoàn Tiền</button>
                              <button onClick={()=>setReviewingItem({ orderId: o.id, item: it })} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Đánh Giá</button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer total */}
                <div className="px-4 py-3 flex items-center justify-end space-x-2 border-t bg-gray-50">
                  <div className="text-sm">Thành tiền:</div>
                  <div className="text-lg font-bold text-red-600">{(o.finalTotal || o.total).toLocaleString('vi-VN')}đ</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-600 mb-4">Bạn chưa có đơn hàng nào</p>
            <button onClick={()=>navigate('/')} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Tiếp tục mua sắm</button>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {reviewingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setReviewingItem(null)} />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold">Đánh giá sản phẩm</h3>
              <button onClick={()=>setReviewingItem(null)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-14 h-14 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                {typeof reviewingItem.item.image === 'string' && reviewingItem.item.image.startsWith('http') ? (
                  <img src={reviewingItem.item.image} alt={reviewingItem.item.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl">{reviewingItem.item.image}</span>
                )}
              </div>
              <div className="min-w-0">
                <div className="font-medium truncate max-w-md">{reviewingItem.item.name}</div>
                <div className="text-sm text-gray-500">x{reviewingItem.item.quantity}</div>
              </div>
            </div>
            <ReviewForm
              loading={submitting}
              onCancel={()=>setReviewingItem(null)}
              onSubmit={async (data)=>{
                setSubmitting(true);
                try {
                  const { reviewService } = await import('../../services/reviewService');
                  const res = await reviewService.submitReview(reviewingItem.item.productId, data);
                  if (!res.success) throw new Error(res.error || 'Gửi đánh giá thất bại');
                  alert('Cảm ơn bạn đã đánh giá! Đánh giá đã được lưu.');
                  setReviewingItem(null);
                } finally {
                  setSubmitting(false);
                }
              }}
            />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default OrdersPage;

