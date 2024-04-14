import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import axios from 'axios'
import { useSelector } from 'react-redux'

import AccountSidebar from '@/components/AccountSidebar'
import Input from '@/components/Input'
import { swtoast } from '@/mixins/swal.mixin'
import { customerLoginOrRegister } from '@/store/actions/customerActions'
import { backendAPI } from '@/config'

const CustomerInfoPage = () => {

    const dispatch = useDispatch()
    const [customerId, setCustomerId] = useState('')
    const [customerName, setCustomerName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const customerInfo = useSelector((state) => state.customer.customerInfo)

    useEffect(() => {
        customerInfo != null ? setCustomerId(customerInfo.customer_id) : setCustomerId('')
        customerInfo != null ? setEmail(customerInfo.email) : setEmail('')
        customerInfo != null ? setCustomerName(customerInfo.customer_name) : setCustomerName('')
        customerInfo != null ? setPhoneNumber(customerInfo.phone_number) : setPhoneNumber('')
        customerInfo != null ? setAddress(customerInfo.address) : setAddress('')
    }, [customerInfo])

    const handleUpdate = async () => {
        if (validate()) {
            try {
                let customer = {
                    user_id: customerId,
                    customer_name: customerName,
                    phone_number: phoneNumber,
                    address,
                }
                const response = await axios.put(`${backendAPI}/api/customer/update`, customer)

                let customerInfo = {
                    customer_id: customerId,
                    email,
                    customer_name: response.data.customer_name,
                    phone_number: response.data.phone_number,
                    address: response.data.address
                }
                dispatch(customerLoginOrRegister(customerInfo));
                swtoast.success({ text: "Cập nhật tài khoản thành công" });
            } catch (err) {
                console.log(err);
                swtoast.error({
                    text: "Có lỗi khi cập nhật tài khoản vui lòng thử lại!"
                });
            }
        }
    }

    const validate = () => {
        if (!customerName) {
            swtoast.error({ text: "Tên người dùng không được để trống" })
            return false
        }
        if (!phoneNumber) {
            swtoast.error({ text: "Số điện thoại không được để trống" })
            return false
        }
        if (!address) {
            swtoast.error({ text: "Địa chỉ không được để trống" })
            return false
        }
        return true
    }

    return (
        <div className="account-infor row">
            {/* <Head>
                <title>Tài khoản của bạn</title>
            </Head> */}
            <div className="col-4">
                <AccountSidebar />
            </div>
            <div className="col-8">
                <div className="infor-tab">
                    <div className="title">
                        Thông tin tài khoản
                    </div>
                    <div className="infor-tab-item col-12 row d-flex align-items-center">
                        <div className="col-3">Họ tên</div>
                        <div className="col-7">
                            <Input
                                type="text"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                placeholder='Họ và tên của bạn'
                            />
                        </div>
                    </div>
                    <div className="infor-tab-item col-12 row d-flex align-items-center">
                        <div className="col-3">Email</div>
                        <div className="col-7">
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={true}
                                placeholder='Địa chỉ email'
                            />
                        </div>
                    </div>
                    <div className="infor-tab-item col-12 row d-flex align-items-center">
                        <div className="col-3">Số điện thoại</div>
                        <div className="col-7">
                            <Input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder='Số điện thoại'
                            />
                        </div>
                    </div>
                    <div className="infor-tab-item col-12 row d-flex align-items-center">
                        <div className="col-3">Địa chỉ</div>
                        <div className="col-7">
                            <Input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder='Địa chỉ (Ví dụ: 112/12 3/2 Hưng Lợi, Ninh Kiều)'
                            />
                        </div>
                    </div>
                    <div className="infor-tab-item col-12 row d-flex align-items-center">
                        <div className="col-3">
                            <button className='update-account-btn border-radius' onClick={handleUpdate}>Cập nhật tài khoản</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerInfoPage