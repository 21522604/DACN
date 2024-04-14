import React from 'react';
import axios from 'axios';
import { InputNumber } from 'antd'
import { FaTrash } from "react-icons/fa"

import UploadImageBox from '@/components/UploadImageBox';
import { swalert, swtoast } from "@/mixins/swal.mixin";

const RowProductVariant = ({ index, productVariantList, setProductVariantList, setIsLoading, refreshPage }) => {

    const handlePriceChance = (value) => {
        let productVariantListClone = [...productVariantList];
        productVariantListClone[index].quantity = value;
        setProductVariantList(productVariantListClone);
    }

    const handleDelete = async () => {
        swalert
            .fire({
                title: "Xóa biến thể sản phẩm",
                icon: "warning",
                text: "Bạn muốn xóa biến thể sản phẩm này?",
                showCloseButton: true,
                showCancelButton: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axios.delete('http://localhost:8080/api/product-variant/delete',
                            { data: { product_variant_ids: [productVariantList[index].productVariantId] } })
                        refreshPage()
                        swtoast.success({
                            text: 'Xóa biến thể sản phẩm thành công!'
                        })
                    } catch (err) {
                        console.log(err)
                        swtoast.error({
                            text: 'Xảy ra lỗi khi xóa biến thể sản phẩm vui lòng thử lại!'
                        })
                    }
                }
            })
    }

    return (
        <>
            <tr className='row-product-variant'>
                <td className='col-colour text-center'>
                    {productVariantList[index].colourName}
                </td>
                <td className='col-size text-center'>
                    {productVariantList[index].sizeName}
                </td>
                <td className='col-quantity text-center'>
                    <InputNumber
                        value={productVariantList[index].quantity}
                        style={{ width: '100%' }}
                        onChange={handlePriceChance}
                    />
                </td>
                <td className="col-image">
                    <UploadImageBox
                        index={index}
                        productVariantList={productVariantList}
                        setProductVariantList={setProductVariantList}
                    />
                </td>
                <td className='col-delete text-center'>
                    <FaTrash style={{ cursor: "pointer" }} title='Xóa' className="text-danger" onClick={() => handleDelete()} />
                </td>
            </tr>
        </>
    )
}

export default RowProductVariant
