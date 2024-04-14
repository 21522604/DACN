import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { swalert, swtoast } from '@/mixins/swal.mixin'
import Input from "@/components/Input"
import { FaTimes } from 'react-icons/fa';

import { backendAPI } from '@/config'
import { customerLoginOrRegister } from '../store/actions/customerActions'

const Register = (props) => {
    const fullNameRef = useRef()
    const phoneNumberRef = useRef()
    const emailRef = useRef()
    const pwdRef = useRef()
    const pwdAgainRef = useRef()

    const [fullName, setFullName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')

    const dispatch = useDispatch()

    const [fullNameError, setFullNameError] = useState('')
    const [phoneNumberError, setPhoneNumberError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [pwdError, setPwdError] = useState('')
    const [pwdAgainError, setPwdAgainError] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault();
        if (fullName == '') {
            setFullNameError("Tên không được để trống!!");
            setPhoneNumberError('')
            setEmailError('')
            setPwdError('')
            setPwdAgainError('')
            fullNameRef.current.focus()
            return
        }
        if (phoneNumber == '') {
            setPhoneNumberError("Số điện thoại không được để trống!!");
            setFullNameError('');
            setEmailError('')
            setPwdError('')
            setPwdAgainError('')
            phoneNumberRef.current.focus()
            return
        }
        if (email == '') {
            setEmailError("Email không được để trống!!");
            setFullNameError("");
            setPhoneNumberError('')
            setPwdError('')
            setPwdAgainError('')
            emailRef.current.focus()
            return
        }
        if (password == '') {
            setPwdError("Password không được để trống!!");
            setFullNameError("");
            setPhoneNumberError('')
            setEmailError('')
            setPwdAgainError('')
            pwdRef.current.focus()
            return
        }
        if (passwordAgain == '') {
            setPwdAgainError("Vui lòng nhập lại mật khẩu!!");
            setFullNameError("");
            setPhoneNumberError('')
            setEmailError('')
            setPwdError('')
            pwdAgainRef.current.focus()
            return
        }
        if (passwordAgain != password) {
            setPwdAgainError("Mật khẩu nhập lại chưa đúng!!");
            setFullNameError("");
            setPhoneNumberError('')
            setEmailError('')
            setPwdError('')
            pwdAgainRef.current.focus()
            return
        }
        try {
            const respond = await axios.post(`${backendAPI}/api/customer/register`, {
                email: email,
                password: password,
                customer_name: fullName,
                phone_number: phoneNumber
            })
            dispatch(customerLoginOrRegister(respond.data))
            swtoast.success({
                text: "Đăng ký tài khoản thành công!"
            })
            props.toClose();
        } catch (error) {
            swtoast.error({
                text: error.response.data
            })
        }
    }
    return (
        <div className='user register w-100 position-absolute d-flex' onClick={props.toClose}>
            <div className="user-box position-relative register-box border-radius" onClick={(e) => e.stopPropagation()}>
                <div className="header-form position-absolute" onClick={props.toClose}>
                    <FaTimes />
                </div>
                <form action="" onSubmit={handleRegister} className="form-user form-register">
                    <h3 className="heading text-center">Đăng ký tài khoản</h3>
                    <Input
                        type="text"
                        className='w-100 border-radius'
                        placeholder='Họ và tên'
                        inputRef={fullNameRef}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        error={fullNameError}
                    />
                    <Input
                        type="text"
                        className='w-100 border-radius'
                        placeholder='Số điện thoại'
                        inputRef={phoneNumberRef}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        error={phoneNumberError}
                    />
                    <Input
                        type="email"
                        className='w-100 border-radius'
                        placeholder='Email'
                        inputRef={emailRef}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError}
                    />
                    <Input
                        type="password"
                        className='w-100 border-radius'
                        placeholder='Mật khẩu'
                        inputRef={pwdRef}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={pwdError}
                    />
                    <Input
                        type="password"
                        className='w-100 border-radius'
                        placeholder='Nhập lại mật khẩu'
                        inputRef={pwdAgainRef}
                        value={passwordAgain}
                        onChange={(e) => setPasswordAgain(e.target.value)}
                        error={pwdAgainError}
                    />
                    <button className='w-100 border-radius' type='submit'>Đăng ký</button>
                </form>
                <div className="footer-form d-flex justify-content-center">
                    <a className='footer-form-item' href="#" onClick={props.toLogin}>Đăng nhập</a>
                </div>
            </div>
        </div>
    )
}

export default Register