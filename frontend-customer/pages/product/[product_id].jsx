import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Rate } from 'antd';
import { StarFilled } from '@ant-design/icons'
import { swtoast } from '@/mixins/swal.mixin'
import { formatPrice, formatRate } from '../../helpers/format.js'

import CarouselFade from '@/components/ProductDetailPage/Carousel.jsx'
import OptionButton from '@/components/ProductDetailPage/OptionButton.jsx'
import ProductQuantityInput from '@/components/ProductDetailPage/ProductQuantityInput.jsx'
import PolicyItem from '@/components/ProductDetailPage/PolicyItem.jsx'
import FeedbackBox from '@/components/ProductDetailPage/FeedbackBox.jsx'
import { policyList } from '@/data/PolicyData'
import { addToCart, clearError } from '@/store/actions/cartActions'
import { backendAPI } from '@/config'

const fakeColourList = [{ colour_id: 1, colour_name: 'Trắng' }, { colour_id: 2, colour_name: 'Đen' }];
const fakeSizeList = [{ size_id: 1, size_name: 'S' }, { size_id: 2, size_name: 'M' }, { size_id: 3, size_name: 'L' }];
const fake_product_image = [
	'https://media.coolmate.me/cdn-cgi/image/quality=80/image/September2022/untitled-5_32.jpg',
	'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2021/1426x2100_(3).jpg',
	'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/September2022/DSC04797-copy-1.jpg',
];

const ProductDetailPage = () => {

	const router = useRouter()
	const { product_id, colour } = router.query
	const dispatch = useDispatch()
	const isErrorInCart = useSelector((state) => state.cart.isError)
	const messageErrorInCart = useSelector((state) => state.cart.messageError)

	const [productName, setProductName] = useState('')
	const [productDescription, setProductDescription] = useState('')
	const [feedbackQuantity, setFeedbackQuantity] = useState('')
	const [rating, setRating] = useState('')
	const [sold, setSold] = useState('')

	const [colorList, setColorList] = useState([]);
	const [selectedColorIndex, setSelectedColorIndex] = useState(null);
	const [sizeList, setSizeList] = useState([]);
	const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);

	const [productVariantId, setProductVariantId] = useState('')
	const [inventory, setInventory] = useState(0)
	const [quantity, setQuantity] = useState(1)
	const [price, setPrice] = useState('0')
	const [product_image, setProduct_Image] = useState([]);

	const [feedbackList, setFeedbackList] = useState([])

	useEffect(() => {
		const handleGetProduct = async () => {
			try {
				let respond = await axios.get(backendAPI + `/api/product/customer/detail/${product_id}`);
				setProductName(respond.data.product_name);
				setProductDescription(respond.data.description);
				setFeedbackQuantity(respond.data.feedback_quantity);
				setRating(respond.data.rating);
				setSold(respond.data.sold);

				respond = await axios.get(backendAPI + `/api/product/customer/list-colour/${product_id}`);
				setColorList(respond.data);
				setSelectedColorIndex(0);
				for (let index in respond.data) {
					if (respond.data[index].colour_id == colour)
						setSelectedColorIndex(parseInt(index));
				}

				respond = await axios.get(backendAPI + `/api/feedback/list/${product_id}`);
				setFeedbackList(respond.data)
			} catch (error) {
				console.log(error);
				setColorList(fakeColourList);
				setSelectedColorIndex(0);
			}
		}
		if (product_id) {
			handleGetProduct();
		}
	}, [product_id])

	useEffect(() => {
		const handleGetListColour = async () => {
			try {
				let respond = await axios.get(backendAPI + '/api/product/customer/list-size'
					+ '/' + product_id
					+ '/' + colorList[selectedColorIndex].colour_id
				);
				setSizeList(respond.data);
				setSelectedSizeIndex(0);
			} catch (error) {
				console.log(error);
				setSizeList(fakeSizeList);
				setSelectedSizeIndex(0);
			}
		}
		if (selectedColorIndex !== null) {
			handleGetListColour();
		}
	}, [selectedColorIndex]);

	useEffect(() => {
		const handleGetProductVariant = async () => {
			try {
				let respond = await axios.get(backendAPI + '/api/product-variant/customer/detail'
					+ '/' + product_id
					+ '/' + colorList[selectedColorIndex].colour_id
					+ '/' + sizeList[selectedSizeIndex].size_id
				);
				setProductVariantId(respond.data.product_variant_id)
				setInventory(respond.data.quantity)
				setPrice(respond.data.price)
				setProduct_Image(respond.data.product_images);
			} catch (error) {
				console.log(error);
				setProduct_Image(fake_product_image);
			}
		}
		if (selectedColorIndex !== null && selectedSizeIndex !== null) {
			handleGetProductVariant();
		}
	}, [selectedColorIndex, selectedSizeIndex]);

	useEffect(() => {
		if (isErrorInCart) {
			swtoast.fire({
				text: messageErrorInCart
			});
			dispatch(clearError());
		}
	}, [isErrorInCart])

	const handleAddToCart = () => {
		let product = {
			productVariantId: productVariantId,
			name: productName,
			colour: colorList[selectedColorIndex].colour_name,
			size: sizeList[selectedSizeIndex].size_name,
			image: product_image[0],
			price: price,
			inventory: inventory,
			quantity: quantity
		}
		dispatch(addToCart(product));
		setQuantity(1);
		if (!isErrorInCart)
			swtoast.success({ text: "Thêm sản phẩm vào giỏ hàng thành công" });
	}

	return (
		<div className='product-detail-page'>
			<div className="row main-infor-product">
				<div className="col-4">
					<CarouselFade product_image={product_image} />
				</div>
				<div className="col-8">
					<h6 className="product-name">{productName}</h6>
					<div className="rating d-flex align-items-center">
						<span className='d-flex align-items-center'>
							<Rate disabled allowHalf value={rating} />
							<h6 className='d-inline-block'>({feedbackQuantity})</h6>
						</span>
						<span style={{ margin: "2px 0 0" }}>Đã bán (web): {sold}</span>
					</div>
					<div className="price-box">
						<span>{formatPrice(price)}đ</span>
					</div>
					<div className="colour-option-box">
						<span>Màu:
							<strong>
								&nbsp;{colorList[selectedColorIndex] ? colorList[selectedColorIndex].colour_name : ''}
							</strong>
						</span>
						<div>
							{colorList &&
								colorList.map((colour, index) => {
									return (
										<OptionButton
											getContent={() => {
												setSelectedColorIndex(index)
												router.push(`/product/${product_id}?colour=${colour.colour_id}`)
											}}
											content={colour.colour_name}
											key={index}
											isSelected={selectedColorIndex === index}
										/>
									);
								})}
						</div>
					</div>
					<div className="size-option-box">
						<span>Kích cỡ:&nbsp;
							<strong>
								{sizeList[selectedSizeIndex] ? sizeList[selectedSizeIndex].size_name : ''}
							</strong>
						</span>
						<div>
							{sizeList &&
								sizeList.map((size, index) => {
									return (
										<OptionButton
											getContent={() => setSelectedSizeIndex(index)}
											content={size.size_name}
											key={index}
											isSelected={selectedSizeIndex === index}
										/>
									);
								})}
						</div>
					</div>
					<div className="action-box row">
						<ProductQuantityInput quantity={quantity} setQuantity={setQuantity} />
						<div className="add-product-to-cart-button border-radius col-7 d-flex justify-content-around align-items-center" onClick={handleAddToCart}>
							Thêm vào giỏ hàng
						</div>
					</div>
					<div className="policy-box d-flex flex-wrap justify-content-around position-relative">
						{
							policyList && policyList.map((item, index) => {
								return (
									<PolicyItem key={index} icon={item.icon} des={item.des} />
								)
							})
						}
					</div>
				</div>
			</div>

			<div className="row product-detail">
				<div className="col-12">
					<h5 className='title text-center'>Chi tiết sản phẩm</h5>
					<div
						dangerouslySetInnerHTML={{ __html: productDescription }}
					/>
				</div>
			</div>
			<div className="review-box position-relative d-flex align-items-center">
				<div className="">
					<h5 className='feedback_quantify-detail d-inline-block'>{feedbackQuantity} Đánh giá</h5>
					<h5 className='rating-detail d-inline-block'>{formatRate(rating)} / 5 <span className='star-icon'><StarFilled /></span></h5>
				</div>
			</div>
			<FeedbackBox feedbackList={feedbackList} />
		</div >
	)
}

export default ProductDetailPage