import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Empty } from 'antd'

import ProductItem from '@/components/CollectionPage/ProductItem'

import { backendAPI } from '@/config'

const CollectionPage = () => {
    const router = useRouter()
    const { category } = router.query
    const [productList, setProductList] = useState([])
    useEffect(() => {
        const getProductList = async () => {
            try {
                let url = category ? `${backendAPI}/api/product/customer/list?category=${category}` : `${backendAPI}/api/product/customer/list`
                const result = await axios.get(url)
                setProductList(result.data)
            } catch (err) {
                console.log(err)
            }
        }

        getProductList()
    }, [category])

    return (
        <div className="product-page">
            <div className="product-box d-flex flex-row flex-wrap justify-content-start">
                {
                    productList.length ?
                        productList.map((product, index) => {
                            return (
                                <ProductItem
                                    key={index}
                                    product_id={product.product_id}
                                    name={product.product_name}
                                    img={product.product_image}
                                    price={product.price}
                                    colour_id={product.colour_id}
                                    sizes={product.sizes}
                                    rating={product.rating}
                                    feedback_quantity={product.feedback_quantity}
                                />
                            )
                        })
                        :
                        <div className='d-flex' style={{ width: "100%", height: "400px" }}>
                            <Empty style={{ margin: "auto" }} />
                        </div>
                }
            </div>
        </div>
    )
}

export default CollectionPage