import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Modal, Rate, Input } from 'antd'
const { TextArea } = Input

import { backendAPI } from '@/config'
import { swtoast } from '@/mixins/swal.mixin'

const UpdateFeedbackModal = (props) => {
    const { isOpen, setIsOpen, productVariantId, setProductVariantId, refreshOrderList } = props
    const [feedbackId, setFeedbackId] = useState('')
    const [rate, setRate] = useState(0)
    const [content, setContent] = useState('')
    const customerInfo = useSelector((state) => state.customer.customerInfo)
    const isLoggedIn = useSelector(state => state.customer.isLoggedIn)

    useEffect(() => {
        const getFeedback = async () => {
            try {
                let customerId = customerInfo.customer_id
                let response = await axios.get(`${backendAPI}/api/feedback/detail/${customerId}/${productVariantId}`)
                setFeedbackId(response.data.feedback_id)
                setRate(response.data.rate)
                setContent(response.data.content)
            } catch (err) {
                console.log(err)
                setProductVariantId(null)
                setIsOpen(false)
                swtoast.error({ text: "Có lỗi khi tải đánh giá vui lòng thử lại!" });
            }
        }
        if (isLoggedIn) getFeedback()
    }, [])

    const handleCancel = (e) => {
        e.preventDefault();
        setProductVariantId(null)
        setIsOpen(false)
    };

    const handleUpdateFeedback = async () => {
        if (isLoggedIn) {
            try {
                let feedback = {
                    feedback_id: feedbackId,
                    rate, content
                }
                await axios.put(`${backendAPI}/api/feedback/update`, feedback)
                swtoast.success({ text: "Sửa đánh giá thành công" })
                setProductVariantId(null)
                setIsOpen(false)
                refreshOrderList
            } catch (err) {
                console.log(err)
                setProductVariantId(null)
                setIsOpen(false)
                swtoast.error({ text: "Có lỗi khi sửa đánh giá vui lòng thử lại!" });
            }
        }
    }

    return (
        <Modal
            className='feedback-modal'
            open={isOpen}
            onCancel={handleCancel}
            footer={null}
            centered={true}
        >
            <div className="modal-head">
                <h5 className="text-center">Đánh giá của bạn</h5>
            </div>
            <div className="modal-body">
                <div className="d-flex align-items-center">
                    <label>Đánh giá: </label>
                    <div className='rating-box'>
                        <Rate
                            value={rate}
                            onChange={(value) => setRate(value)}
                        />
                    </div>
                </div>
                <div className="">
                    <label htmlFor="content">Bình luận: </label>
                    <div className="content-box">
                        <TextArea
                            value={content}
                            id="content"
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Bình luận"
                            autoSize={{
                                minRows: 3,
                                maxRows: 5,
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="modal-foot">
                <div className="rate-btn border-radius bg-dark text-light text-center" onClick={handleUpdateFeedback}>
                    Sửa đánh giá
                </div>
            </div>
        </Modal>
    )
}

export default UpdateFeedbackModal