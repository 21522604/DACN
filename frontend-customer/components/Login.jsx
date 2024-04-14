import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { swalert, swtoast } from '@/mixins/swal.mixin'
import { FaTimes } from 'react-icons/fa'
import Input from '@/components/Input'

import { backendAPI } from '@/config'
import { customerLoginOrRegister } from '../store/actions/customerActions'

const Login = (props) => {
	const emailInputRef = useRef()
	const passwordInputRef = useRef()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()

	const [emailError, setEmailError] = useState('')
	const [pwdError, setPwdError] = useState('')

	const handleLogin = async (e) => {
		e.preventDefault();
		if (!email) {
			setEmailError("Địa chỉ email không được để trống!")
			setPwdError('')
			emailInputRef.current.focus()
			return
		}
		if (!password) {
			setPwdError("Mật khẩu không được để trống!")
			setEmailError('')
			passwordInputRef.current.focus()
			return
		}
		try {
			const respond = await axios.post(`${backendAPI}/api/customer/login`, {
				email: email,
				password: password
			})
			dispatch(customerLoginOrRegister(respond.data));
			swtoast.success({
				text: "Đăng nhập tài khoản thành công!"
			})
			props.toClose();
		} catch (error) {
			swtoast.error({
				text: error.response.data
			})
		}
	}

	return (
		<div className='user login w-100 position-absolute d-flex' onClick={props.toClose}>
			<div className="user-box position-relative login-box text-center border-radius" onClick={(e) => e.stopPropagation()}>
				<div className="header-form position-absolute" onClick={props.toClose}>
					<FaTimes />
				</div>
				<form action="" onSubmit={handleLogin} className="form-user form-login">
					<h3 className="heading">Đăng nhập</h3>
					<Input
						type="email"
						className='w-100 border-radius'
						placeholder='Email'
						inputRef={emailInputRef}
						value={email}
						required
						onChange={(e) => setEmail(e.target.value)}
						error={emailError}
					/>
					<Input
						type="password"
						className='w-100 border-radius'
						placeholder='Mật khẩu'
						inputRef={passwordInputRef}
						value={password}
						required
						error={pwdError}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className='w-100 border-radius' type='submit'>Đăng nhập</button>
				</form>
				<div className="footer-form d-flex justify-content-between">
					<a className='footer-form-item' href="#" onClick={props.toRegister}>Đăng ký tài khoản mới</a>
					<a className='footer-form-item' href="#" onClick={props.toForgotPassword}>Quên mật khẩu</a>
				</div>
			</div>
		</div>
	)
}

export default Login