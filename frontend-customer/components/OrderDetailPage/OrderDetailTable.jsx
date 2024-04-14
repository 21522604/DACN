import React from 'react'
import { formatPrice } from '@/helpers/format';

const OrderDetailTable = (props) => {

    const { orderItems, totalProductValue, deliveryCharges, totalOrderValue } = props;

    return (
        <div className="order-detail-table">
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá niêm yết</th>
                        <th>Biến thể</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody className='text-right'>
                    {
                        orderItems && orderItems.map((orderItem, index) => {
                            return (
                                <tr key={index}>
                                    <td>{orderItem.name}</td>
                                    <td className='text-center'>{orderItem.quantity}</td>
                                    <td className='text-center'>{formatPrice(orderItem.price)}</td>
                                    <td className='text-center'>{`${orderItem.colour} / ${orderItem.size}`}</td>
                                    <td className='text-right'>{formatPrice(orderItem.total_value)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr className=''>
                        <td colSpan="4" className=''>Tổng giá trị sản phẩm</td>
                        <td colSpan="1">{formatPrice(totalProductValue)}</td>
                    </tr>
                    <tr className=''>
                        <td colSpan="4" className=''>Phí giao hàng</td>
                        <td colSpan="1">{formatPrice(deliveryCharges)}</td>
                    </tr>
                    <tr className='total'>
                        <td colSpan="4" className=''>Tổng thanh toán</td>
                        <td colSpan="1">{formatPrice(totalOrderValue)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default OrderDetailTable