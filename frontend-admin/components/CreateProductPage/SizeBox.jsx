import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import axios from 'axios';

// let fakeSizeList = [
//     { size_id: 1, size_name: 'S' }, { size_id: 2, size_name: 'M' },
//     { size_id: 3, size_name: 'L' }, { size_id: 4, size_name: 'XL' },
// ];

const SizeBox = ({ selectedSizes, setSelectedSizes, sizeBoxValue, setSizeBoxValue }) => {

    const [sizeList, setSizeList] = useState([]);
    const [options, setOptions] = useState([])

    useEffect(() => {
        const getSizeList = async () => {
            try {
                const result = await axios.get('http://localhost:8080/api/size/list');
                setSizeList(result.data);
            } catch (err) {
                console.log(err);
                // setSizeList(fakeSizeList);
            }
        }
        getSizeList();
    }, [])

    useEffect(() => {
        let options = sizeList.map((size) => {
            return {
                label: size.size_name,
                value: size.size_id
            }
        })
        setOptions(options)
    }, [sizeList])

    const handleOnSelect = (sizeId, option) => {
        let size = sizeList.find(size => size.size_id == sizeId)
        setSelectedSizes([...selectedSizes, size])
        setSizeBoxValue([...sizeBoxValue, option])
    }

    const handleOnDeselect = (sizeId, { value }) => {
        let selectedSizesClone = [...selectedSizes]
        selectedSizesClone = selectedSizesClone.filter(size => size.size_id != sizeId)
        setSelectedSizes(selectedSizesClone)
        let sizeBoxValueClone = [...sizeBoxValue]
        sizeBoxValueClone = sizeBoxValueClone.filter(option => option.value != value)
        setSizeBoxValue(sizeBoxValueClone)
    }

    return (
        <div>
            <label htmlFor="enter-size" className="fw-bold">Size:</label>
            <Select
                id='enter-size'
                mode="multiple"
                value={sizeBoxValue}
                style={{ width: '100%' }}
                placement='bottomLeft'
                placeholder="Chọn size"
                onSelect={handleOnSelect}
                onDeselect={handleOnDeselect}
                options={options}
            />
        </div>
    )
}

export default SizeBox