import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { Input, InputNumber, Empty } from 'antd'

import Header from '@/components/Header';
import Category from '@/components/Category';
import CKeditor from '@/components/CKEditor';
import RowProductVariant from '@/components/UpdateProductPage/RowProductVariant';
import Loading from '@/components/Loading';
import { swtoast } from "@/mixins/swal.mixin";
import { homeAPI } from '@/config'

const fakeProductDetail = {
    product_id: 1,
    product_name: 'Áo Nam Active Pro',
    category_id: 3,
    category_name: 'Áo T-Shirt',
    price: 179000,
    description: '<h1>Đây là một cái áo<h1>',
    product_variant_list: [
        {
            product_variant_id: 1,
            colour_id: 1,
            colour_name: 'Trắng',
            size_id: 1,
            size_name: 'S',
            quantity: 4,
            product_images: [
                { path: 'http://localhost:8080/static/images/35bd44e7-3969-4a28-9c32-077b9f85162c.jpg' },
                { path: 'http://localhost:8080/static/images/35bd44e7-3969-4a28-9c32-077b9f85162c.jpg' },
                { path: 'http://localhost:8080/static/images/35bd44e7-3969-4a28-9c32-077b9f85162c.jpg' },
            ]
        },
        {
            product_variant_id: 2,
            colour_id: 2,
            colour_name: 'Đen',
            size_id: 2,
            size_name: 'M',
            quantity: 13,
            product_images: [
                { path: 'http://localhost:8080/static/images/35bd44e7-3969-4a28-9c32-077b9f85162c.jpg' },
                { path: 'http://localhost:8080/static/images/35bd44e7-3969-4a28-9c32-077b9f85162c.jpg' },
                { path: 'http://localhost:8080/static/images/35bd44e7-3969-4a28-9c32-077b9f85162c.jpg' },
            ]
        },
    ]
}

const UpdateProductPage = () => {
    const { product_id } = Router.query

    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('')
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [productVariantList, setProductVariantList] = useState([]);
    const [rowProductVariant, setRowProductVariant] = useState([]);

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    useEffect(() => {
        const getProductDetail = async () => {
            try {
                setIsLoading(true)
                const result = await axios.get(`${homeAPI}/product/admin/detail/${product_id}`)
                setProductId(result.data.product_id)
                setProductName(result.data.product_name)
                setCategoryId(result.data.category_id)
                setCategoryName(result.data.category_name)
                setPrice(result.data.price)
                setDescription(result.data.description)
                setProductVariantList(await convertProductVariantList(result.data.product_variant_list))
                setIsLoading(false)
            } catch (err) {
                console.log(err);
                setIsLoading(false)
                Router.push("/404")
                setProductId(fakeProductDetail.product_id)
                setProductName(fakeProductDetail.product_name)
                setCategoryId(fakeProductDetail.category_id)
                setCategoryName(fakeProductDetail.category_name)
                setPrice(fakeProductDetail.price)
                setDescription(fakeProductDetail.description)
                setProductVariantList(await convertProductVariantList(fakeProductDetail.product_variant_list))
            }
        }
        if (product_id) getProductDetail()
    }, [product_id]);

    useEffect(() => {
        let rowProductVariantTemp = [];
        for (let i in productVariantList) {
            rowProductVariantTemp.push(
                <RowProductVariant
                    key={i}
                    index={i}
                    productVariantList={productVariantList}
                    setProductVariantList={setProductVariantList}
                    setIsLoading={setIsLoading}
                    refreshPage={refreshPage}
                />
            );
        }
        setRowProductVariant(rowProductVariantTemp);
    }, [productVariantList]);

    const convertProductVariantList = async (productVariantList) => {
        let productVariantListTemp = []
        for (let productVariant of productVariantList) {
            let productImages = productVariant.product_images
            let fileList = []
            for (let { path } of productImages) {
                try {
                    let name = path.slice(-40, -4)
                    let response = await fetch(path)
                    let blob = await response.blob();
                    const file = new File([blob], name, { type: blob.type });
                    fileList.push({
                        uid: name,
                        name: name,
                        url: path,
                        originFileObj: file
                    })
                } catch (err) {
                    console.log(err)
                }
            }
            productVariantListTemp.push({
                productVariantId: productVariant.product_variant_id,
                colourId: productVariant.colour_id,
                colourName: productVariant.colour_name,
                sizeId: productVariant.size_id,
                sizeName: productVariant.size_name,
                quantity: productVariant.quantity,
                fileList
            })
        }

        return productVariantListTemp
    }

    const refreshPage = async () => {
        if (product_id) {
            try {
                const result = await axios.get(`${homeAPI}/product/admin/detail/${product_id}`)
                setProductId(result.data.product_id)
                setProductName(result.data.product_name)
                setCategoryId(result.data.category_id)
                setCategoryName(result.data.category_name)
                setPrice(result.data.price)
                setDescription(result.data.description)
                setProductVariantList(await convertProductVariantList(result.data.product_variant_list))
            } catch (err) {
                console.log(err);
                Router.push("/404")
            }
        }
    }

    const updateProduct = async () => {
        if (Validate()) {
            try {
                setIsLoading(true)
                let updateProduct = {
                    product_id: productId,
                    product_name: productName,
                    category_id: categoryId,
                    price,
                    description
                }
                let result = await axios.put(`${homeAPI}/product/update`, updateProduct);
                console.log(result.data);
                for (let productVariant of productVariantList) {
                    let dataProductVariant = new FormData();
                    dataProductVariant.append('product_variant_id', productVariant.productVariantId);
                    dataProductVariant.append('quantity', productVariant.quantity);
                    for (let file of productVariant.fileList)
                        dataProductVariant.append('product_images', file.originFileObj);
                    let rsult = await axios.put(
                        `${homeAPI}/product-variant/update`,
                        dataProductVariant,
                        {
                            headers: { 'Content-Type': 'multipart/form-data' }
                        }
                    );
                    console.log(rsult.data);
                }
                setIsLoading(false)
                swtoast.success({ text: 'Cập nhập sản phẩm thành công!' })
                refreshPage()
            } catch (err) {
                console.log(err);
                setIsLoading(false)
            }
        }
    }

    const Validate = () => {
        if (!productName) {
            swtoast.error({ text: 'Tên sản phẩm không được bỏ trống' })
            return false
        }
        if (!categoryId) {
            swtoast.error({ text: 'Danh mục sản phẩm không được bỏ trống' })
            return false
        }
        if (!price) {
            swtoast.error({ text: 'Giá sản phẩm không được bỏ trống' })
            return false
        }
        if (!description) {
            swtoast.error({ text: 'Mô tả sản phẩm không được bỏ trống' })
            return false
        }
        if (!productVariantList.length) {
            swtoast.error({ text: 'Sản phẩm phải có ít nhất 1 biến thể' })
            return false
        }
        for (const productVariant of productVariantList) {
            if (!productVariant.quantity) {
                swtoast.error({ text: 'Biến thể sản phẩm phải có ít nhất một tồn kho' })
                return false
            }
            if (!productVariant.fileList.length) {
                swtoast.error({ text: 'Biến thể sản phẩm phải có ít nhất một ảnh' })
                return false
            }
        }
        return true
    }



    return (
        <div className='update-product-page'>
            <Header title="Cập nhật sản phẩm" />
            <div className="update-product-form">
                {/* // Input Ten san pham */}
                <div className="row">
                    <div className="col-6">
                        <label htmlFor='product-name' className="fw-bold">Tên sản phẩm:</label>
                        <Input
                            id='product-name' placeholder='Nhập tên sản phẩm'
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                </div>
                {/* // Component danh muc */}
                <div className="row">
                    <div className="col-6">
                        <label htmlFor='product-category' className="fw-bold">Danh mục:</label>
                        <Category setCategoryId={setCategoryId} categoryName={categoryName} setCategoryName={setCategoryName} />
                    </div>
                    <div className="col-6">
                        <label htmlFor='product-price' className="fw-bold">Giá sản phẩm:</label>
                        <br />
                        <InputNumber
                            id='product-price' placeholder='Nhập giá sản phẩm'
                            value={price === 0 ? null : price}
                            style={{ width: '100%' }}
                            onChange={setPrice}
                        />
                    </div>
                </div>
                {/* // Mo ta san pham = CKEditor */}
                <div className="description">
                    <label htmlFor='description' className="fw-bold">Mô tả sản phẩm:</label>
                    <div className="ckeditor-box">
                        <CKeditor
                            Placeholder={{ placeholder: "Mô tả ..." }}
                            name="description"
                            id="description"
                            form="add-product-form"
                            data={description}
                            onChange={(data) => {
                                setDescription(data);
                            }}
                            editorLoaded={editorLoaded}
                        />
                    </div>
                </div>
                {/* dung Selected colour va Seleted size de tao bang Product-Variant */}
                <div>
                    <label htmlFor='enter-name' className="fw-bold">Danh sách lựa chọn:</label>
                    <table className="table w-100 table-hover align-middle table-bordered">
                        <thead>
                            <tr className='row-product-variant'>
                                <th className='col-colour text-center' scope="col">Màu</th>
                                <th className='col-size text-center' scope="col">Size</th>
                                <th className='col-quantity text-center' scope="col">Tồn kho</th>
                                <th className='col-image text-center' scope="col">Ảnh</th>
                                <th className='col-delete text-center' scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowProductVariant.length ? rowProductVariant : <tr><td colSpan={5}><Empty /></td></tr>}
                        </tbody>
                    </table>
                </div>
                <div className="btn-box text-left">
                    <button className='text-light bg-dark' onClick={updateProduct}>
                        Cập nhật sản phẩm
                    </button>
                </div>
            </div>
            {isLoading && <Loading />}
        </div>
    )
}

export default UpdateProductPage