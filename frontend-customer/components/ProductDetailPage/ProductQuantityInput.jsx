import React from 'react'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'

const ProductQuantityInput = (props) => {
    const { quantity, setQuantity } = props;

    return (
        <div className="fw-bold border-radius quantity-button col-3 d-flex justify-content-around align-items-center">
            <PlusOutlined onClick={() => setQuantity(quantity + 1)} />
            <span>{quantity}</span>
            <MinusOutlined onClick={() => { if (quantity - 1 >= 1) setQuantity(quantity - 1) }} />
        </div>
    )
}

export default ProductQuantityInput