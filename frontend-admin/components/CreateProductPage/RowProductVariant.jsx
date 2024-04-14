import React from 'react';
import { InputNumber } from 'antd'

import UploadImageBox from '@/components/UploadImageBox';

const RowProductVariant = ({ index, productVariantList, setProductVariantList }) => {

    const handlePriceChance = (value) => {
        let productVariantListClone = [...productVariantList];
        productVariantListClone[index].quantity = value;
        setProductVariantList(productVariantListClone);
    }

    return (
        <>
            <tr className='row-product-variant'>
                <td className='col-colour text-center'>
                    {productVariantList[index].colour_name}
                </td>
                <td className='col-size text-center'>
                    {productVariantList[index].size_name}
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
            </tr>
        </>
    )
}

export default RowProductVariant
