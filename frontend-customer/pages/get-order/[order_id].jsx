import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import axios from 'axios'

import AccountSidebar from '@/components/AccountSidebar'
import OrderDetailTable from '@/components/OrderDetailPage/OrderDetailTable'
import { swtoast } from '@/mixins/swal.mixin'
import { formatTime } from '@/helpers/format';
import { backendAPI } from '@/config'

const fakeOrderDetail = {
    "order_id": null,
    "state_id": 4,
    "state_name": "Đã Giao",
    "created_at": "2023-03-25T01:43:36.000Z",
    "order_items": [
        {
            "name": "Áo thun thể thao nam Active ProMax",
            "quantity": 1,
            "price": 179000,
            "colour": "Trắng",
            "size": "XL",
            "total_value": 179000
        },
        {
            "name": "Áo thun thể thao nam Active ProMax",
            "quantity": 1,
            "price": 179000,
            "colour": "Đen",
            "size": "M",
            "total_value": 179000
        },
        {
            "name": "Quần Jeans Clean Denim dáng Regular S3",
            "quantity": 1,
            "price": 599000,
            "colour": "Xanh Nhạt",
            "size": "30",
            "total_value": 599000
        }
    ],
    "total_product_value": 957000,
    "delivery_charges": 20000,
    "total_order_value": 977000,
    "customer_name": "Vương Trung Tín",
    "email": "tin@gmail.com",
    "phone_number": "0932528331",
    "address": "51A9 Đường Trần Nam Phú, Phường An Khánh, Quận Ninh Kiều, Thành Phố Cần Thơ"
}

const OrderDetailPage = () => {
    const router = useRouter()
    const { order_id } = router.query

    const [customerId, setCustomerId] = useState('')
    const [stateId, setStateId] = useState('')
    const [orderId, setOrderId] = useState('')
    const [stateName, setStateName] = useState('')
    const [orderItems, setOrderItems] = useState([])
    const [totalProductValue, setTotalProductValue] = useState(0)
    const [deliveryCharges, setDeliveryCharges] = useState(0)
    const [totalOrderValue, setTotalOrderValue] = useState(0)
    const [createdAt, setCreatedAt] = useState('')
    const [customerName, setCustomerName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const isLoggedIn = useSelector(state => state.customer.isLoggedIn)
    const customerInfo = useSelector((state) => state.customer.customerInfo)

    useEffect(() => {
        if (isLoggedIn)
            customerInfo != null ? setCustomerId(customerInfo.customer_id) : setCustomerId('')
    }, [isLoggedIn]);

    useEffect(() => {
        const getOrderDetail = async () => {
            try {
                let response = await axios.get(backendAPI + `/api/order/detail/${customerId}/${order_id}`);
                setOrderId(response.data.order_id)
                setStateName(response.data.state_name)
                setStateId(response.data.state_id)
                setCreatedAt(response.data.created_at)
                setOrderItems(response.data.order_items)
                setTotalProductValue(response.data.total_product_value)
                setDeliveryCharges(response.data.delivery_charges)
                setTotalOrderValue(response.data.total_order_value)
                setCustomerName(response.data.customer_name)
                setEmail(response.data.email)
                setPhoneNumber(response.data.phone_number)
                setAddress(response.data.address)
            } catch (error) {
                console.log(error)
                setOrderId(fakeOrderDetail.order_id)
                setStateName(fakeOrderDetail.state_name)
                setStateId(fakeOrderDetail.state_id)
                setCreatedAt(fakeOrderDetail.created_at)
                setOrderItems(fakeOrderDetail.order_items)
                setTotalProductValue(fakeOrderDetail.total_product_value)
                setDeliveryCharges(fakeOrderDetail.delivery_charges)
                setTotalOrderValue(fakeOrderDetail.total_order_value)
                setCustomerName(fakeOrderDetail.customer_name)
                setEmail(fakeOrderDetail.email)
                setPhoneNumber(fakeOrderDetail.phone_number)
                setAddress(fakeOrderDetail.address)
            }
        }
        if (order_id && customerId) {
            getOrderDetail();
        }
    }, [order_id, customerId])

    const renderCancelBtn = () => {
        if (stateId == 1 || stateId == 2 || stateId == 3) {
            return (
                <button className='cancel-order-btn' onClick={handleCancelOrder}>Hủy đơn hàng</button>
            )
        }
    }

    const handleCancelOrder = async () => {
        try {
            await axios.put(`${backendAPI}/api/order/change-status/${orderId}/5`)
            swtoast.success({ text: "Hủy đơn hàng thành công" });
            router.push('/account/orders')
        } catch (err) {
            console.log(err);
            swtoast.error({
                text: "Có lỗi khi hủy đơn hàng vui lòng thử lại!"
            });
        }
    }

    return (
        <div className='order-detail-page'>
            <div className="row">
                <div className="col-4">
                    <AccountSidebar />
                </div>
                <div className="col-8">
                    <div className="order-detail">
                        <h1 className="title">Thông tin đơn hàng của bạn</h1>
                        <div className="d-flex row align-items-center justify-content-between">
                            <div className="col-3">
                                {renderCancelBtn()}
                            </div>
                            <div className="col-6 order-title border-radius d-flex align-items-center justify-content-center fw-bold">
                                <div>
                                    ĐƠN HÀNG #{orderId}
                                    <span className='order-state'>{stateName}</span>
                                </div>
                            </div>
                            <div className="order-date col-3 d-flex align-items-center justify-content-end">
                                Ngày đặt: {formatTime(createdAt)}
                            </div>
                        </div>
                        <div>
                            <OrderDetailTable
                                orderItems={orderItems}
                                totalProductValue={totalProductValue}
                                deliveryCharges={deliveryCharges}
                                totalOrderValue={totalOrderValue}
                            />
                        </div>
                        <p className='receive-info-title'>Thông tin nhận hàng</p>
                        <div className="receive-info-box border-radius">
                            <p>
                                Tên người nhận:
                                <strong>{" " + customerName}</strong>
                            </p>
                            <p>
                                Địa chỉ email:
                                <strong>{" " + email}</strong>
                            </p>
                            <p>
                                Số điện thoại:
                                <strong>{" " + phoneNumber}</strong>
                            </p>
                            <p>
                                Hình thức thanh toán:
                                <strong>{" " + "COD"}</strong>
                            </p>
                            <p>
                                Địa chỉ giao hàng:
                                <strong>{" " + address}</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailPage