import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import axios from 'axios';
import CreateFeedbackModal from '@/components/OrderHistoryPage/CreateFeedbackModal';
import UpdateFeedbackModal from '@/components/OrderHistoryPage/UpdateFeedbackModal';

import AccountSidebar from '@/components/AccountSidebar'
import Order from '@/components/OrderHistoryPage/Order'
import { backendAPI } from '@/config'

export const fakeOrderList = [
    {
        "order_id": null,
        "state_id": 4,
        "state_name": "Chờ Xác Nhận",
        "order_items": [
            {
                "product_variant_id": 3,
                "name": "Áo thun thể thao nam Active ProMax",
                "image": "https://media.coolmate.me/cdn-cgi/image/quality=80/image/May2022/pro_s2_trang_ping.jpg",
                "quantity": 2,
                "colour": "Trắng",
                "size": "L",
                "price": 179000,
                "has_feedback": true
            },
            {
                "product_variant_id": 19,
                "name": "Quần Jeans Clean Denim dáng Regular S3",
                "image": "https://media.coolmate.me/cdn-cgi/image/quality=80/image/May2022/pro_s2_trang_ping.jpg",
                "quantity": 1,
                "colour": "Xanh Đậm",
                "size": "29",
                "price": 599000
            }
        ],
        "total_order_value": 977000,
        "created_at": "2023-03-16T03:22:48.000Z"
    },
    {
        "order_id": null,
        "state_id": 1,
        "state_name": "Chờ Xác Nhận",
        "order_items": [
            {
                "product_variant_id": 3,
                "name": "Áo thun thể thao nam Active ProMax",
                "image": "https://media.coolmate.me/cdn-cgi/image/quality=80/image/May2022/pro_s2_trang_ping.jpg",
                "quantity": 2,
                "colour": "Trắng",
                "size": "L",
                "price": 179000
            },
            {
                "product_variant_id": 19,
                "name": "Quần Jeans Clean Denim dáng Regular S3",
                "image": "https://media.coolmate.me/cdn-cgi/image/quality=80/image/May2022/pro_s2_trang_ping.jpg",
                "quantity": 1,
                "colour": "Xanh Đậm",
                "size": "29",
                "price": 599000
            }
        ],
        "total_order_value": 977000,
        "created_at": "2023-03-16T03:22:48.000Z"
    }
]

const OrderHistoryPage = () => {
    const [customerId, setCustomerId] = useState('abc')
    const [orderList, setOrderList] = useState([])
    const customerInfo = useSelector((state) => state.customer.customerInfo)
    const isLoggedIn = useSelector(state => state.customer.isLoggedIn)

    useEffect(() => {
        if (isLoggedIn)
            customerInfo != null ? setCustomerId(customerInfo.customer_id) : setCustomerId('')
    }, [isLoggedIn]);

    useEffect(() => {
        const getOrderList = async () => {
            try {
                const result = await axios.get(`${backendAPI}/api/order/customer/list/${customerId}`)
                setOrderList(result.data)
            } catch (err) {
                console.log(err)
                setOrderList(fakeOrderList)
            }
        }
        if (customerId) getOrderList()
    }, [customerId]);

    // Modal
    const [isCreateFeedbackModalOpen, setIsCreateFeedbackModalOpen] = useState(false);
    const [isUpdateFeedbackModalOpen, setIsUpdateFeedbackModalOpen] = useState(false);
    const [productVariantIdForFeedBack, setProductVariantIdForFeedBack] = useState(null);

    const refreshOrderList = async () => {
        if (customerId) {
            try {
                const result = await axios.get(`${backendAPI}/api/order/customer/list/${customerId}`)
                setOrderList(result.data)
            } catch (err) {
                console.log(err)
                setOrderList(fakeOrderList)
            }
        }
    }

    return (
        <div className='order-history-page row'>
            <div className="col-4">
                <AccountSidebar />
            </div>
            <div className="col-8">
                <div className="orders-tab">
                    <div className="title">
                        {
                            orderList.length == 0 ? "Đơn hàng của bạn" : `Đơn hàng của bạn: ${orderList.length} đơn hàng`
                        }
                    </div>
                    <div className="orders-body">
                        {orderList && orderList.length === 0 ?
                            <p className='text-center'>Bạn chưa có đơn hàng nào!</p>
                            :
                            orderList.map((order, index) => {
                                return (
                                    // <div key={index}>
                                    //     <Link href={`/get-order/${order.order_id}`}>
                                    <Order
                                        key={index}
                                        id={order.order_id}
                                        stateId={order.state_id}
                                        stateName={order.state_name}
                                        orderItems={order.order_items}
                                        totalOrderValue={order.total_order_value}
                                        createdAt={order.created_at}
                                        setIsCreateFeedbackModalOpen={setIsCreateFeedbackModalOpen}
                                        setIsUpdateFeedbackModalOpen={setIsUpdateFeedbackModalOpen}
                                        setProductVariantIdForFeedBack={setProductVariantIdForFeedBack}
                                    />
                                    //     </Link>
                                    // </div>
                                )
                            })
                        }
                    </div>
                </div>
                {isCreateFeedbackModalOpen &&
                    <CreateFeedbackModal
                        isOpen={isCreateFeedbackModalOpen}
                        setIsOpen={setIsCreateFeedbackModalOpen}
                        productVariantId={productVariantIdForFeedBack}
                        setProductVariantId={setProductVariantIdForFeedBack}
                        refreshOrderList={refreshOrderList}
                    />
                }
                {isUpdateFeedbackModalOpen &&
                    <UpdateFeedbackModal
                        isOpen={isUpdateFeedbackModalOpen}
                        setIsOpen={setIsUpdateFeedbackModalOpen}
                        productVariantId={productVariantIdForFeedBack}
                        setProductVariantId={setProductVariantIdForFeedBack}
                        refreshOrderList={refreshOrderList}
                    />
                }
            </div>
        </div>
    )
}

export default OrderHistoryPage