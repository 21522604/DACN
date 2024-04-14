import React from 'react'

import { formatPrice } from '@/helpers/format';

const OrderItem = (props) => {

    const { productVariantId, name, image, quantity, colour, size, price, stateId, hasFeedback, setIsCreateFeedbackModalOpen, setIsUpdateFeedbackModalOpen, setProductVariantIdForFeedBack } = props;

    const showCreateFeedbackModal = (e) => {
        e.preventDefault();
        setProductVariantIdForFeedBack(productVariantId)
        setIsCreateFeedbackModalOpen(true);
    };

    const showUpdateFeedbackModal = (e) => {
        e.preventDefault();
        setProductVariantIdForFeedBack(productVariantId)
        setIsUpdateFeedbackModalOpen(true);
    };

    const renderFeedbackBtn = () => {
        if (stateId == 4)
            if (hasFeedback)
                return (
                    <div onClick={showUpdateFeedbackModal} className="feedback-btn border-radius" >
                        <span>Sửa đánh giá</span>
                    </div >
                )
            else
                return (
                    <div onClick={showCreateFeedbackModal} className="feedback-btn border-radius" >
                        <span>Đánh giá sản phẩm</span>
                    </div >
                )
    }

    return (
        <div className='order-item'>
            <div className="row">
                <div className="col-2 d-flex border-radius justify-content-center align-items-center">
                    <div className="box-img border-radius">
                        <img className="border-radius" src={image} alt="" />
                    </div>
                </div>
                <div className="col-10 border-radius d-flex justify-content-between">
                    <div className="order-item-info position-relative">
                        <div className="order-item-title">
                            {name}
                        </div>
                        <div className="order-item-quantity">
                            ×{quantity}
                        </div>
                        <div className="order-item-variant-label">
                            {`${colour} / ${size}`}
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="price-box fw-bold">
                                {formatPrice(price)}đ
                            </div>
                        </div>
                    </div>
                    <div>
                        {renderFeedbackBtn()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderItem