import React, { useState, useEffect } from 'react'
import { Select } from 'antd';
import axios from 'axios';

// let fakeColourList = [
//     { colour_id: 1, colour_name: 'Trắng' }, { colour_id: 2, colour_name: 'Đen' }, { colour_id: 3, colour_name: 'Xám' },
//     { colour_id: 4, colour_name: 'Xanh' }, { colour_id: 5, colour_name: 'Đỏ' },
// ];

const ColourBox = ({ selectedColours, setSelectedColours, colourBoxValue, setColourBoxValue }) => {

    const [colourList, setColourList] = useState([]);
    const [options, setOptions] = useState([])

    useEffect(() => {
        const getColourList = async () => {
            try {
                const result = await axios.get('http://localhost:8080/api/colour/list');
                setColourList(result.data);
            } catch (err) {
                console.log(err);
                // setColourList(fakeColourList);
            }
        }
        getColourList()
    }, [])

    useEffect(() => {
        let options = colourList.map((colour) => {
            return {
                label: colour.colour_name,
                value: colour.colour_id
            }
        })
        setOptions(options)
    }, [colourList])

    const handleOnSelect = (colourId, option) => {
        let colour = colourList.find(colour => colour.colour_id == colourId)
        setSelectedColours([...selectedColours, colour])
        setColourBoxValue([...colourBoxValue, option])
    }

    const handleOnDeselect = (colourId, { value }) => {
        let selectedColoursClone = [...selectedColours]
        selectedColoursClone = selectedColoursClone.filter(colour => colour.colour_id != colourId)
        setSelectedColours(selectedColoursClone)
        let colourBoxValueClone = [...colourBoxValue]
        colourBoxValueClone = colourBoxValueClone.filter(option => option.value != value)
        setColourBoxValue(colourBoxValueClone)
    }

    return (
        <div>
            <label htmlFor="enter-color" className="fw-bold">Màu:</label>
            <Select
                id='enter-color'
                mode="multiple"
                value={colourBoxValue}
                style={{ width: '100%' }}
                placement='bottomLeft'
                placeholder="Chọn màu"
                onSelect={handleOnSelect}
                onDeselect={handleOnDeselect}
                options={options}
            />
        </div>
    )
}

export default ColourBox