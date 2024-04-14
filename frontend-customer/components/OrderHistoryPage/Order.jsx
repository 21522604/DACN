import React from 'react'
import Link from 'next/link'

import OrderItem from './OrderItem'
import { formatPrice, formatDate } from '@/helpers/format';

const Order = (props) => {
    const { id, orderItems, totalOrderValue, stateId, stateName, createdAt, setIsCreateFeedbackModalOpen, setIsUpdateFeedbackModalOpen, setProductVariantIdForFeedBack } = props;

    return (
        <Link className='order border-radius' href={`/get-order/${id}`}>

            <div className="order-header border-radius d-flex align-items-center justify-content-between">
                <div>
                    <p className='order-title fw-bold'>#{id}</p>
                    <p className='order-date'>{formatDate(createdAt)}</p>
                </div>
                <div className='order-status'>
                    <span className='fw-bold'>{stateName}</span>
                </div>
            </div>
            <div className="order-body">
                {orderItems && orderItems.map((orderItem, index) => (
                    <OrderItem
                        key={index}
                        productVariantId={orderItem.product_variant_id}
                        name={orderItem.name}
                        image={orderItem.image}
                        quantity={orderItem.quantity}
                        colour={orderItem.colour}
                        size={orderItem.size}
                        price={orderItem.price}
                        stateId={stateId}
                        hasFeedback={orderItem.has_feedback}
                        setIsCreateFeedbackModalOpen={setIsCreateFeedbackModalOpen}
                        setIsUpdateFeedbackModalOpen={setIsUpdateFeedbackModalOpen}
                        setProductVariantIdForFeedBack={setProductVariantIdForFeedBack}
                    />
                ))}
            </div>
            <div className="order-footer d-flex align-items-center justify-content-end">
                <div>Tổng đơn hàng: <strong>{formatPrice(totalOrderValue)}đ</strong></div>
            </div>
        </Link>
    )
}

export default Order