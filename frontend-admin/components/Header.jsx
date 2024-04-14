import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaUser, FaSignOutAlt } from 'react-icons/fa'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Radio, Space } from 'antd';
import * as actions from '../store/actions';

const Header = (props) => {
	const dispatch = useDispatch()
	const adminInfo = useSelector((state) => state.admin.adminInfo)

	const handleLogOut = () => {
		dispatch(actions.adminLogOut());
	}

	return (
		<div className="header d-flex align-items-center justify-content-between">
			<h6 className="title-header">{props.title}</h6>
			<div className="account-box d-flex justify-content-between">
				<div className="user-icon-box position-relative">
					<Button
						className="d-flex align-items-center justify-content-center"
						type=""
						icon={<UserOutlined />}
						ghost='true'
						danger='true'
						style={{
							border: "1.5px solid #000",
						}}
					>
						{adminInfo.email}
					</Button>
				</div>
				<div className="logout-box">
					<Button
						className="btn btn-dark d-flex align-items-center justify-content-center"
						type=""
						icon={<LogoutOutlined />}
						danger='true'
						style={{ backgroundColor: "#000" }}
						onClick={handleLogOut}
					>
						Đăng xuất
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Header