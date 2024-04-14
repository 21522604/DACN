import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { sidebar } from '@/data/AccountInforData'

const AccountSidebar = () => {
    const [customerName, setCustomerName] = useState('')
    const customerInfo = useSelector((state) => state.customer.customerInfo)
    const router = useRouter()
    const urlParts = router.pathname;

    useEffect(() => {
        customerInfo != null ? setCustomerName(customerInfo.customer_name) : setCustomerName('')
    }, [customerInfo])

    return (
        <div className="account-sidebar">
            <div className="title">
                {customerName ? customerName : "Thông tin khách hàng"}
            </div>
            <div className="sidebar-items">
                {sidebar &&
                    sidebar.map((item, index) => {
                        if (item.href === urlParts) {
                            return (
                                <Link
                                    key={index}
                                    className='sidebar-item d-block border-radius active'
                                    href={item.href}
                                    onClick={() => item.onClick()}
                                >
                                    {item.text}
                                </Link>
                                // </li>
                            );
                        } else if (urlParts.includes("[id]") && item.href.includes('orders')) {
                            return (
                                <Link
                                    key={index}
                                    className='sidebar-item d-block border-radius active'
                                    href={item.href}
                                    onClick={() => item.onClick()}
                                >
                                    {item.text}
                                </Link>
                            );
                        } else {
                            return (
                                <Link
                                    key={index}
                                    className='sidebar-item d-block border-radius'
                                    href={item.href}
                                    onClick={() => item.onClick()}>
                                    {item.text}
                                </Link>
                            );
                        }
                    })}
            </div>
        </div>
    )
}

export default AccountSidebar