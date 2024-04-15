import React from 'react'
import { ServiceData, AboutData, AddressData } from '@/data/FooterData'
import { PhoneOutlined, MailOutlined } from "@ant-design/icons"
import { FaFacebookF, FaInstagram, FaYoutubeSquare } from 'react-icons/fa'
import { CiYoutube } from "react-icons/ci"

const Footer = () => {
	return (
		<div className="text-left footer">
			<div className="row">
				<div className="col-9 row" style={{ paddingRight: "100px" }}>
					<div className="col-4 fs-13">
						<ul>
							{ServiceData.map((service) => (
								<li key={service.heading}>
									<p className="fw-bold">{service.heading}</p>
									<ul>
										{service.list.map((item) => (
											<li key={item}>
												<a href="#">
													{item}
												</a>
											</li>
										))}
									</ul>
								</li>
							))}
						</ul>
					</div>
					<div className="col-4 fs-13">
						<ul>
							{AboutData.map((service) => (
								<li key={service.heading}>
									<p className="fw-bold">{service.heading}</p>
									<ul>
										{service.list.map((item) => (
											<li key={item}>
												<a href="#">
													{item}
												</a>
											</li>
										))}
									</ul>
								</li>
							))}
						</ul>
					</div>
					<div className="col-4 fs-13">
						<ul>
							{AddressData.map((service) => (
								<li key={service.heading}>
									<p className="fw-bold">{service.heading}</p>
									<ul>
										{service.list.map((item) => (
											<li key={item}>
												<a href="#">
													{item}
												</a>
											</li>
										))}
									</ul>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="col-3 row">
					<div className="col-12">
						<ul>
							<li>
								<h5>
									KT lắng nghe bạn!
								</h5>
								<ul className='fs-13'>
									<li>
										Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến
										đóng góp từ khách hàng để có thể nâng cấp trải nghiệm dịch vụ và sản phẩm tốt hơn nữa.
									</li>
								</ul>
							</li>
							<div>
								<button className='border-radius fw-bold'>
									Gửi ý kiến
								</button>
							</div>
							<div>
								<div className='d-flex align-items-center' style={{ marginBottom: "12px" }}>
									<div className='col-3'>
										<PhoneOutlined />
									</div>
									<div className='col-9'>
										<p>Hotline</p>
										<p>0368.197.969</p>
									</div>
								</div>
								<div className='d-flex align-items-center' style={{ marginBottom: "12px" }}>
									<div className='col-3'>
										<MailOutlined />
									</div>
									<div className='col-9'>
										<p>Email</p>
										<p>KT@contact.com</p>
									</div>
								</div>
							</div>
						</ul>
					</div>
				</div>
				<div className="copy-right-box fs-11 position-relative">
					<p className="fw-bold text-uppercase">© Công ty tnhh KT</p>
					<p>Mã số doanh nghiệp: 0123456789. Giấy chứng nhận đăng ký doanh nghiệp do Sở Kế hoạch và Đầu tư TP Hà Nội cấp lần đầu ngày 15/04/2024.</p>
				</div>
			</div>
		</div>
	)
}

export default Footer