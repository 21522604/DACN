import React, { useState, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { swalert, swtoast } from "@/mixins/swal.mixin";

const OrderRow = (props) => {
    const { order_id, state_id, state_name, created_at, total_order_value, refreshOrderTable } = props;

    const addPointToPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    const convertTime = (created_at) => {
        const date = new Date(created_at);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // tháng (giá trị từ 0 đến 11, nên cộng thêm 1)
        const day = date.getDate(); // ngày trong tháng
        const hours = date.getHours(); // giờ
        const minutes = date.getMinutes(); // phút
        const seconds = date.getSeconds(); // giây
        const formattedDate = `${day}/${month}/${year}`;
        const formattedTime = `${hours}:${minutes}:${seconds}`;
        return (
            <>
                {formattedDate} <br /> {formattedTime}
            </>
        )
    }

    const renderCancelOrderBtn = () => {
        if (state_id == 1 || state_id == 2 || state_id == 3) {
            return (
                <>
                    <br />
                    <a className="text-danger" href="#" onClick={handleCancelOrder}>Hủy đơn hàng</a>
                </>
            )
        }
    }

    const renderChangeStatusBtn = () => {
        if (state_id == 1) {
            return (
                <>
                    <a href="#" onClick={handleChangeStatus}>Xác nhận đơn hàng</a>
                    <br />
                </>
            )
        }
        if (state_id == 2) {
            return (
                <>
                    <a href="#" onClick={handleChangeStatus}>Xác nhận đã bàn giao cho đơn vị vận chuyển</a>
                    <br />
                </>
            )
        }
        if (state_id == 3) {
            return (
                <>
                    <a href="#" onClick={handleChangeStatus}>Xác nhận đã giao hàng thành công</a>
                    <br />
                </>
            )
        }
    }

    const handleCancelOrder = () => {
        swalert
            .fire({
                title: "Hủy đơn hàng",
                icon: "warning",
                text: "Bạn muốn hủy đơn hàng này?",
                showCloseButton: true,
                showCancelButton: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axios.put('http://localhost:8080/api/order/change-status/' + order_id + '/6')
                        refreshOrderTable();
                        swtoast.success({
                            text: 'Hủy đơn hàng thành công!'
                        })
                    } catch (err) {
                        console.log(err)
                        swtoast.error({
                            text: 'Xảy ra lỗi khi hủy đơn hàng vui lòng thử lại!'
                        })
                    }
                }
            })
    }

    const handleChangeStatus = () => {
        if (state_id == 1) {
            swalert
                .fire({
                    title: "Xác nhận đơn hàng",
                    icon: "info",
                    text: "Bạn muốn tiếp nhận đơn hàng này?",
                    showCloseButton: true,
                    showCancelButton: true,
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await axios.put('http://localhost:8080/api/order/change-status/' + order_id + '/2')
                            refreshOrderTable();
                            swtoast.success({
                                text: 'Xác nhận đơn hàng thành công!'
                            })
                        } catch (err) {
                            console.log(err)
                            swtoast.error({
                                text: 'Xảy ra lỗi khi xác nhận đơn hàng vui lòng thử lại!'
                            })
                        }
                    }
                })
        }
        if (state_id == 2) {
            swalert
                .fire({
                    title: "Xác nhận đã bàn giao cho đơn vị vận chuyển",
                    icon: "info",
                    text: "Đơn hàng này đã được bàn giao cho đơn vị vận chuyển?",
                    showCloseButton: true,
                    showCancelButton: true,
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await axios.put('http://localhost:8080/api/order/change-status/' + order_id + '/3')
                            refreshOrderTable();
                            swtoast.success({
                                text: 'Xác nhận bàn giao cho đơn vị vận chuyển thành công!'
                            })
                        } catch (err) {
                            console.log(err)
                            swtoast.error({
                                text: 'Xảy ra lỗi khi xác nhận bàn giao vui lòng thử lại!'
                            })
                        }
                    }
                })
        }
        if (state_id == 3) {
            swalert
                .fire({
                    title: "Xác nhận đã giao hàng thành công",
                    icon: "info",
                    text: "Đơn hàng này đã được giao thành công?",
                    showCloseButton: true,
                    showCancelButton: true,
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await axios.put('http://localhost:8080/api/order/change-status/' + order_id + '/4')
                            refreshOrderTable();
                            swtoast.success({
                                text: 'Xác nhận đã giao thành công!'
                            })
                        } catch (err) {
                            console.log(err)
                            swtoast.error({
                                text: 'Xảy ra lỗi khi xác nhận đã giao vui lòng thử lại!'
                            })
                        }
                    }
                })
        }
    }

    return (
        <div className="table-responsive">
            <table className="table align-middle order-manage-table w-100">
                <tbody className="w-100 text-center">
                    <tr className="w-100">
                        <td className="fw-bold col-order-id">
                            <p className="d-flex align-items-center justify-content-center">
                                #{order_id}
                            </p>
                        </td>
                        <td className="text-danger fw-bold col-state">
                            <p className="d-flex align-items-center justify-content-center">
                                {state_name}
                            </p>
                        </td>
                        <td className="col-create-at">
                            <p className="d-flex align-items-center justify-content-center">
                                {convertTime(created_at)}
                            </p>
                        </td>
                        <td className="text-danger fw-bold col-total-value">
                            <p>
                                {addPointToPrice(total_order_value)}
                            </p>
                        </td>
                        <td className="col-action manipulation">
                            {renderChangeStatusBtn()}
                            <Link href={`/order/detail/${order_id}`}>Xem chi tiết</Link>
                            {renderCancelOrderBtn()}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default OrderRow