import React, { useState } from 'react'
import { menu } from '../data/data'
import router from 'next/router'

const Section = () => {
    const [showMenuItem, setShowMenuItem] = useState({})

    const handleClick = index => {
        setShowMenuItem({
            ...showMenuItem,
            [index]: !showMenuItem[index]
        })
    }

    return (
        <div className='section w-100'>
            <div className="logo-box text-center">
                <img className='logo' src="http://localhost:3000/img/logo.png" alt="" />
            </div>
            <ul className="menu position-relative">
                {
                    menu && menu.map((item, index) => {
                        return (
                            <li onClick={() => router.push(item.href)} className='menu-item text-uppercase fw-bold' key={index}>
                                <a onClick={() => handleClick(index)} className='w-100' href="#">{item.title}</a>
                                {
                                    showMenuItem[index] && (

                                        <ul className='sub-menu position-absolute w-100'>
                                            {
                                                item.list && item.list.map((listItem, i) => {
                                                    return (
                                                        <li onClick={() => router.push(listItem.href)} key={i} className='w-100'>
                                                            <a
                                                                href='#'
                                                                className="w-100"
                                                            >

                                                                {listItem.title}
                                                            </a>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    )
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Section