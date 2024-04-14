import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Link from 'next/link'
import Swal from "sweetalert2";
import { swalert } from '@/mixins/swal.mixin';
import { FaUserAlt, FaShoppingBag } from 'react-icons/fa'
import { FaAngleDown } from 'react-icons/fa'

import Login from "./Login"
import Register from './Register';
import { customerLogOut } from '../store/actions/customerActions'
import { backendAPI } from '@/config'

let fakeCategoryList = [
	{
		category_id: 1,
		title: "Áo Nam",
		children: [
			{ category_id: 3, title: "Áo T-Shirt" },
			{ category_id: 4, title: "Áo Polo" },
		]
	},
	{
		category_id: 2,
		title: "Quần Nam",
		children: [
			{ category_id: 5, title: "Quần Short" },
			{ category_id: 6, title: "Quần Jeans" },
		]
	},
];

const Header = () => {
	const [categoryList, setCategoryList] = useState([]);
	const [isLogInOpen, setIsLogInOpen] = useState(false);
	const [isRegisterOpen, setIsRegisterOpen] = useState(false)
	const [isClose, setIsClose] = useState(true)
	const isLoggedIn = useSelector(state => state.customer.isLoggedIn);
	const dispatch = useDispatch()

	useEffect(() => {
		const handleGetCategory = async () => {
			try {
				let respond = await axios.get(backendAPI + '/api/category/nest-list');
				setCategoryList(respond.data)
			} catch (error) {
				console.log(error);
				setCategoryList(fakeCategoryList);
			}
		}
		handleGetCategory();
	}, [])

	const toClose = () => {
		setIsLogInOpen(false)
		setIsRegisterOpen(false)
	}

	return (
		<div className="header-wrapper position-relation">
			{
				!isLoggedIn &&
				<>
					<div className={!isLogInOpen ? `${'d-none'}` : ''}>
						<Login
							toRegister={() => {
								setIsLogInOpen(false)
								setIsRegisterOpen(true)
							}}
							toClose={toClose}
						/>
					</div>
					<div className={!isRegisterOpen ? `${'d-none'}` : ''}>
						<Register
							toLogin={() => {
								setIsRegisterOpen(false)
								setIsLogInOpen(true)
							}}
							toClose={toClose}
						/>
					</div>
				</>
			}
			<div className="header w-100 d-flex align-items-center">
				<div className="logo-box p-2">
					<Link href="/">
						<img className='logo' src="../img/logo.png" alt="" />
					</Link>
				</div>
				<ul className="menu p-2">
					<li className="menu-item fw-bold text-uppercase position-relative">
						<Link
							href="/collections"
							className="d-flex align-items-center"
						>
							Tất cả
						</Link>
					</li>
					{
						categoryList.map((categoryLevel1, index) => {
							return (
								<li
									className="menu-item fw-bold text-uppercase position-relative"
									key={index}>
									<Link
										href="#"
										className="d-flex align-items-center"
									>
										{categoryLevel1.title}
										<span><FaAngleDown /></span>
									</Link>
									<ul className='sub-menu position-absolute'>
										{
											categoryLevel1.children && categoryLevel1.children.map((category, index) => {
												return (
													<li key={index} className='w-100'>
														<Link href={{ pathname: "/collections", query: { category: category.category_id } }}>{category.title}</Link>
													</li>
												)
											})
										}
									</ul>
								</li>
							)
						})
					}
				</ul>

				<ul className="header-inner p-2 ms-auto">
					{
						!isLoggedIn ?
							<li onClick={() => {
								setIsLogInOpen(true)
							}}
								className="inner-item menu-item fw-bold text-uppercase">
								<a href='#'>Đăng Nhập</a>
							</li>
							:
							<>
								<li className="inner-item menu-item fw-bold text-uppercase">
									<Link href="/account/infor">Account</Link>
								</li>
								<li onClick={() => {
									swalert
										.fire({
											title: "Đăng xuất",
											icon: "warning",
											text: "Bạn muốn đăng xuất?",
											showCloseButton: true,
											showCancelButton: true,
										})
										.then(async (result) => {
											if (result.isConfirmed) {
												dispatch(customerLogOut())
												window.location.assign('/')
											}
										})
								}} className="inner-item menu-item fw-bold text-uppercase">
									<a href='#'>Log Out</a>
								</li>
							</>
					}
					<li className="cart inner-item menu-item fw-bold text-uppercase">
						<Link href="/cart"><FaShoppingBag /></Link>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Header