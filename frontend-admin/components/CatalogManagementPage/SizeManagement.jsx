import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from "sweetalert2";

import Heading from '../Heading'
import { swtoast } from '@/mixins/swal.mixin'
import { homeAPI } from '@/config'

// const fakeSizeList = [
//     { size_id: 1, size_name: "S" },
//     { size_id: 2, size_name: "M" },
//     { size_id: 3, size_name: "L" },
// ]

const SizeManage = () => {
    const [sizeList, setSizeList] = useState([])

    useEffect(() => {
        const getSizeList = async () => {
            try {
                const result = await axios.get(`${homeAPI}/size/list`)
                setSizeList(result.data)
            } catch (err) {
                console.log(err)
                // setSizeList(fakeSizeList)
            }
        }
        getSizeList()
    }, [])

    const refreshSizetTable = async () => {
        try {
            const result = await axios.get(homeAPI + '/size/list')
            setSizeList(result.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleCreateSize = async () => {
        const { value: newSize } = await Swal.fire({
            title: 'Nhập tên size mới',
            input: 'text',
            inputLabel: '',
            inputPlaceholder: 'Tên size mới..',
            showCloseButton: true,
        })
        if (!newSize) {
            swtoast.fire({
                text: "Thêm size mới không thành công!"
            })
            return
        }
        if (newSize) {
            try {
                await axios.post(homeAPI + '/size/create',
                    {
                        size_name: newSize
                    })
                refreshSizetTable()
                swtoast.success({
                    text: 'Thêm size mới thành công!'
                })
            } catch (e) {
                console.log(e)
                swtoast.error({
                    text: 'Xảy ra lỗi khi thêm size mới vui lòng thử lại!'
                })
            }
        }
    }

    return (
        <div className="catalog-management-item">
            <Heading title="Tất cả size" />
            <div className='create-btn-container'>
                <button className='btn btn-dark btn-sm' onClick={handleCreateSize}>Tạo size</button>
            </div>
            <div className='table-container' style={{ height: "220px" }}>
                <table className='table table-hover table-bordered'>
                    <thead>
                        <tr>
                            <th className='text-center'>STT</th>
                            <th>
                                Tên size
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sizeList.map((size, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='text-center'>{index + 1}</td>
                                        <td>{size.size_name}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SizeManage