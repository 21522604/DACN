import React from 'react'
import { useDispatch } from 'react-redux'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { CloseOutlined } from '@ant-design/icons'

import { decrementQuantity, incrementQuantity } from '@/store/actions/cartActions'
import { removeItem } from '@/store/actions/cartActions'

const CartItem = (props) => {

    const { productVariantId, name, image, colour, size, quantity, totalValue } = props;
    const dispatch = useDispatch()

    return (
        <div className="cart-item">
            <div className="row">
                <div className="cart-col-left col-3">
                    <div className="box-img position-relative border-radius">
                        <img className="border-radius" src={image} alt="" />
                        <div className="position-absolute product-quantity">
                            {quantity}
                        </div>
                    </div>
                </div>
                <div className="cart-col-right col-9 d-flex flex-column justify-content-between">
                    <div className="cart-item-info position-relative">
                        <div className="product-name">
                            <p className="fw-bold">
                                {name}
                            </p>
                        </div>
                        <CloseOutlined
                            className="cart-item-remove position-absolute"
                            onClick={() => dispatch(removeItem(productVariantId))}
                        />
                        <div className="orther-info">
                            <p>{`${colour} / ${size}`}</p>
                        </div>
                        <div className="cart-item-action">
                            <div
                                className="fw-bold quantity-button col-3 d-flex justify-content-between align-items-center"
                                style={{ border: '1px solid #000 ', borderRadius: '8px' }}
                            >
                                <PlusOutlined onClick={() => { dispatch(incrementQuantity(productVariantId)) }} />
                                <span>{quantity}</span>
                                <MinusOutlined onClick={() => { dispatch(decrementQuantity(productVariantId)) }} />
                            </div>
                        </div>
                    </div>
                    <div className="cart-item-price">
                        {totalValue}đ
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem