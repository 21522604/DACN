import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select } from 'antd';

import { homeAPI } from '@/config'

// const fakeCategoryList = [
//     {
//         category_id: 1,
//         title: 'Áo Nam',
//         children: [
//             {
//                 category_id: 3,
//                 title: 'Áo T-Shirt'
//             },
//             {
//                 category_id: 4,
//                 title: 'Áo Polo'
//             }
//         ]
//     },
//     {
//         category_id: 2,
//         title: 'Quần Nam',
//         children: [
//             {
//                 category_id: 5,
//                 title: 'Quần Short'
//             },
//             {
//                 category_id: 6,
//                 title: 'Quần Jeans'
//             }
//         ]
//     }
// ];

const Category = ({ setCategoryId, categoryName, setCategoryName }) => {
    const [categoryList, setCategoryList] = useState([])
    const [options, setOptions] = useState([])

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const result = await axios.get(`${homeAPI}/category/nest-list`);
                setCategoryList(result.data)
            } catch (err) {
                console.log(err);
                // setCategoryList(fakeCategoryList);
            }
        }

        fetchCategory()
    }, [])

    useEffect(() => {
        let options = categoryList.map((categoryLevel1) => {
            let categoryLevel2List = categoryLevel1.children
            let options = categoryLevel2List.map((categoryLevel2) => {
                let option = { label: categoryLevel2.title, value: categoryLevel2.category_id }
                return option
            })

            return {
                label: categoryLevel1.title,
                options: options
            }
        })
        setOptions(options)
    }, [categoryList])

    return (
        <div className='category col-12'>
            <div className="">
                <Select
                    id='product-category'
                    value={!categoryName ? null : categoryName}
                    options={options}
                    placeholder={'Chọn danh mục sản phẩm'}
                    style={{ width: '100%' }}
                    onChange={(value, option) => { setCategoryId(value); setCategoryName(option.label) }}
                />
            </div>
        </div>
    )
}

export default Category