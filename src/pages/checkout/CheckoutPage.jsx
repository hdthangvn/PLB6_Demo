import MainLayout from '../../layouts/MainLayout';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { useProfile } from '../../hooks/useProfile';

const CheckoutPage = () => {
  const { getSelectedItems, getSelectedTotalItems, getSelectedTotalPrice, formatPrice, removeSelectedItems } = useCart();
  const items = getSelectedItems();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });
  const [editing, setEditing] = useState({ name: false, phone: false, address: false });
  const [paymentMethod, setPaymentMethod] = useState(''); // 'cod' | 'card' | 'ewallet' | 'bank'
  const [shippingMethod, setShippingMethod] = useState('standard'); // 'standard' | 'express'
  const [note, setNote] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [freeShip, setFreeShip] = useState(false);
  const { profile, createOrder } = useProfile();

  // Prefill from user profile
  useEffect(() => {
    if (profile) {
      setCustomer({
        name: profile.name || '',
        phone: profile.phone || '',
        address: profile.address || ''
      });
    }
  }, [profile]);
  const shippingFee = useMemo(() => {
    if (freeShip) return 0;
    const total = getSelectedTotalPrice();
    if (shippingMethod === 'express') return 40000; // giao nhanh cố định
    // tiêu chuẩn miễn phí từ 500k
    return total >= 500000 ? 0 : 30000;
  }, [getSelectedTotalPrice, shippingMethod, freeShip]);

  const productTotal = getSelectedTotalPrice();
  const finalTotal = Math.max(0, productTotal - discount) + shippingFee;

  const placeOrder = async () => {
    if (!customer.name || !customer.phone || !customer.address) {
      alert('Vui lòng điền đủ thông tin nhận hàng');
      return;
    }
    const orderItems = items.map(it => ({
      productId: it.product.id,
      name: it.product.name,
      quantity: it.quantity,
      price: parseInt(it.product.price.replace(/\./g,'')||0)
    }));
    if (!paymentMethod) {
      alert('Vui lòng chọn phương thức thanh toán');
      return;
    }
    const orderTotal = getSelectedTotalPrice();
    const result = await createOrder({
      customer,
      items: orderItems,
      total: orderTotal,
      shippingFee,
      paymentMethod,
      shippingMethod,
      note,
      promoCode,
      discount,
      finalTotal
    });
    if (result.success) {
      removeSelectedItems();
      alert('Đặt hàng thành công!');
      navigate('/profile?tab=orders');
    } else {
      alert(result.error || 'Có lỗi khi tạo đơn hàng');
    }
  };

  if (!items || items.length === 0) {
    navigate('/cart');
    return null;
  }

  const totalItems = getSelectedTotalItems();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-bold mb-4">Thông tin nhận hàng</h2>
            <div className="space-y-3">
              <div className="relative">
                <input className="w-full border rounded px-3 py-2 pr-20" placeholder="Họ và tên" value={customer.name} onChange={(e)=>setCustomer({...customer,name:e.target.value})} readOnly={!editing.name}/>
                <button type="button" onClick={()=>setEditing(prev=>({...prev,name:!prev.name}))} className="absolute right-2 bottom-2 text-xs text-blue-600 hover:text-blue-700">
                  {editing.name ? 'Xác nhận' : 'Thay đổi'}
                </button>
              </div>
              <div className="relative">
                <input className="w-full border rounded px-3 py-2 pr-20" placeholder="Số điện thoại" value={customer.phone} onChange={(e)=>setCustomer({...customer,phone:e.target.value})} readOnly={!editing.phone}/>
                <button type="button" onClick={()=>setEditing(prev=>({...prev,phone:!prev.phone}))} className="absolute right-2 bottom-2 text-xs text-blue-600 hover:text-blue-700">
                  {editing.phone ? 'Xác nhận' : 'Thay đổi'}
                </button>
              </div>
              <div className="relative">
                <input className="w-full border rounded px-3 py-2 pr-20" placeholder="Địa chỉ" value={customer.address} onChange={(e)=>setCustomer({...customer,address:e.target.value})} readOnly={!editing.address}/>
                <button type="button" onClick={()=>setEditing(prev=>({...prev,address:!prev.address}))} className="absolute right-2 bottom-2 text-xs text-blue-600 hover:text-blue-700">
                  {editing.address ? 'Xác nhận' : 'Thay đổi'}
                </button>
              </div>
            </div>
          </div>

          {/* Phương thức vận chuyển */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-bold mb-4">Phương thức vận chuyển</h2>
            <div className="space-y-3 text-sm">
              <label className="flex items-center space-x-2">
                <input type="radio" name="ship" value="standard" checked={shippingMethod==='standard'} onChange={()=>setShippingMethod('standard')}/>
                <span>Tiêu chuẩn (miễn phí từ 500.000đ, còn lại 30.000đ)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="ship" value="express" checked={shippingMethod==='express'} onChange={()=>setShippingMethod('express')}/>
                <span>Giao nhanh (40.000đ)</span>
              </label>
            </div>
          </div>

          {/* Ghi chú đơn hàng */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-bold mb-4">Ghi chú</h2>
            <textarea value={note} onChange={(e)=>setNote(e.target.value)} placeholder="Ghi chú cho người giao hàng (tùy chọn)" rows={3} className="w-full border rounded px-3 py-2" />
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-bold mb-4">Sản phẩm đã chọn ({totalItems})</h2>
            <div className="divide-y">
              {items.map(it => (
                <div key={it.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xl">{it.product.image?.startsWith('http') ? '🛍️' : (it.product.image || '📦')}</span>
                    </div>
                    <div className="truncate">
                      <div className="font-medium truncate">{it.product.name}</div>
                      <div className="text-sm text-gray-500">x{it.quantity}</div>
                    </div>
                  </div>
                  <div className="font-semibold text-red-600">{formatPrice(parseInt(it.product.price.replace(/\./g,'')||0)*it.quantity)}đ</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg border shadow-sm sticky top-4">
            <h2 className="text-xl font-bold mb-4">Tiến hành thanh toán</h2>
            {/* Phương thức thanh toán */}
            <div className="mb-4">
              <div className="text-sm font-medium mb-2">Phương thức thanh toán</div>
              <div className="space-y-2 text-sm">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="pm" value="cod" checked={paymentMethod==='cod'} onChange={()=>setPaymentMethod('cod')}/>
                  <span>Thanh toán khi nhận hàng (COD)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="pm" value="card" checked={paymentMethod==='card'} onChange={()=>setPaymentMethod('card')}/>
                  <span>Thẻ nội địa/ATM</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="pm" value="ewallet" checked={paymentMethod==='ewallet'} onChange={()=>setPaymentMethod('ewallet')}/>
                  <span>Ví điện tử</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="pm" value="bank" checked={paymentMethod==='bank'} onChange={()=>setPaymentMethod('bank')}/>
                  <span>Chuyển khoản ngân hàng</span>
                </label>
              </div>
            </div>

            {/* Mã giảm giá */}
            <div className="mb-4">
              <div className="text-sm font-medium mb-2">Mã giảm giá</div>
              <div className="flex space-x-2">
                <input value={promoCode} onChange={(e)=>setPromoCode(e.target.value)} placeholder="Nhập mã (SALE10, FREESHIP)" className="flex-1 border rounded px-3 py-2" />
                <button type="button" onClick={()=>{
                  const code = promoCode.trim().toUpperCase();
                  if (code==='SALE10') { setDiscount(Math.round(productTotal*0.1)); setFreeShip(false); alert('Áp dụng giảm 10% cho hàng hóa'); }
                  else if (code==='FREESHIP') { setFreeShip(true); setDiscount(0); alert('Áp dụng miễn phí vận chuyển'); }
                  else if (!code) { setDiscount(0); setFreeShip(false); }
                  else { alert('Mã không hợp lệ'); }
                }} className="px-3 py-2 border rounded hover:bg-gray-50">Áp dụng</button>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Tạm tính</span><span>{formatPrice(productTotal)}đ</span></div>
              {discount>0 && (
                <div className="flex justify-between text-green-600"><span>Giảm giá</span><span>-{formatPrice(discount)}đ</span></div>
              )}
              <div className="flex justify-between"><span>Phí vận chuyển</span><span>{shippingFee===0? 'Miễn phí' : formatPrice(shippingFee)+'đ'}</span></div>
              <div className="border-t pt-2 font-semibold text-lg flex justify-between"><span>Tổng cộng</span><span className="text-red-600">{formatPrice(finalTotal)}đ</span></div>
            </div>
            <button onClick={placeOrder} className="w-full mt-4 bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700">Tiến hành thanh toán</button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;

