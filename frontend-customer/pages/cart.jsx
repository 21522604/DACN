import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { swtoast } from '@/mixins/swal.mixin'
import { Radio } from 'antd';
import { FaShippingFast } from 'react-icons/fa'

import CartItem from '@/components/CartPage/CartItem'
import Input from '@/components/Input'
import { backendAPI } from '@/config'
import { formatPrice } from '@/helpers/format'
import { clearCart } from '@/store/actions/cartActions'

const CartPage = () => {
    const [customerId, setCustomerId] = useState('')
    const [customerName, setCustomerName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [deliveryCharges, setDeliveryCharges] = useState(20000)
    const customerInfo = useSelector((state) => state.customer.customerInfo)
    const isLoggedIn = useSelector(state => state.customer.isLoggedIn)
    const productList = useSelector((state) => state.cart.productList)
    const dispatch = useDispatch()

    const [error, setError] = useState('')
    const totalPrice = productList.reduce((accumulator, product) => accumulator + product.totalValue, 0)

    useEffect(() => {
        customerInfo != null ? setCustomerId(customerInfo.customer_id) : setCustomerId('')
        customerInfo != null ? setEmail(customerInfo.email) : setEmail('')
        customerInfo != null ? setCustomerName(customerInfo.customer_name) : setCustomerName('')
        customerInfo != null ? setPhoneNumber(customerInfo.phone_number) : setPhoneNumber('')
        customerInfo != null ? setAddress(customerInfo.address) : setAddress('')
    }, [customerInfo])

    const finalTotal = (price) => {
        return price + deliveryCharges
    }

    const handleOrder = async () => {
        if (isLoggedIn && productList.length) {
            try {
                let orderItems = productList.map((product) => {
                    return { product_variant_id: product.productVariantId, quantity: product.quantity }
                })
                let order = {
                    user_id: customerId,
                    customer_name: customerName,
                    email,
                    phone_number: phoneNumber,
                    address,
                    order_items: orderItems,
                }
                const respond = await axios.post(`${backendAPI}/api/order/create`, order)
                dispatch(clearCart())
                swtoast.success({ text: "Đặt hàng thành công" });
            } catch (err) {
                console.log(err);
                swtoast.error({
                    text: "Có lỗi khi tạo đơn hàng vui lòng thử lại!"
                });
            }
        }
    }

    return (
        <div className="cart-page">
            <div className="row">
                <div className="col-7 cart-left-section">
                    <div className="title">
                        Thông tin vận chuyển
                    </div>
                    <div>
                        <div className="row">
                            <div className="col-6">
                                <Input
                                    type="text"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    error={error}
                                    placeholder="Họ tên"
                                />
                            </div>
                            <div className="col-6">
                                <Input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    error={error}
                                    placeholder="Số điện thoại"
                                />
                            </div>
                        </div>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={error}
                            placeholder="Địa chỉ email"
                            disabled={true}
                        />
                        <Input
                            type="t"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            error={error}
                            placeholder="Địa chỉ (Ví dụ: 112/12 Hưng Lợi, Ninh Kiều)"
                        />
                    </div>
                    <div className="payment">
                        <div className="title">
                            Hình thức thanh toán
                        </div>
                        <div>
                            <label htmlFor="" className="payment-item w-100 border-radius d-flex align-items-center justify-content-start">
                                <div className='payment-item-radio'>
                                    <Radio checked></Radio>
                                </div>
                                <div className='payment-item-icon'>
                                    <FaShippingFast />
                                </div>
                                <div className="payment-item-name">
                                    <p className="text-uppercase">cod</p>
                                    <p className="">Thanh toán khi nhận hàng</p>
                                </div>
                            </label>
                        </div>
                    </div>
                    <button className="order-btn border-radius" onClick={handleOrder}>Đặt Hàng</button>
                </div>
                <div className="col-5 cart-right-section">
                    <div className="title">
                        Giỏ hàng
                    </div>
                    <div className="cart-section">
                        {
                            productList.length > 0 ?
                                productList && productList.map((product, index) => {
                                    return (
                                        <CartItem
                                            key={index}
                                            productVariantId={product.productVariantId}
                                            name={product.name}
                                            image={product.image}
                                            colour={product.colour}
                                            size={product.size}
                                            quantity={product.quantity}
                                            totalValue={formatPrice(product.totalValue)}
                                        />

                                    )
                                }) : <p className="text-center">Chưa có sản phẩm nào trong giỏ hàng</p>
                        }
                    </div>
                    <div className="row pricing-info">
                        <div className="pricing-info-item position-relative d-flex justify-content-between">
                            <p>
                                Tạm tính
                            </p>
                            <p>
                                {formatPrice(totalPrice)}đ
                            </p>
                        </div>
                        <div className="pricing-info-item d-flex justify-content-between">
                            <p>Phí giao hàng</p>
                            <p>{formatPrice(deliveryCharges)}đ</p>
                        </div>
                        <div className="pricing-info-item final-total-box position-relative d-flex justify-content-between">
                            <p className='fw-bold'>Tổng</p>
                            <p className='fw-bold' style={{ fontSize: "20px" }}>
                                {formatPrice(finalTotal(totalPrice))}đ
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage