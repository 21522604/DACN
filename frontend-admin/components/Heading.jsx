import React from 'react'

const Heading = (props) => {
    return (
        <div
            className='heading fw-bold text-center text-uppercase'
            style={{
                margin: "12px"
            }}
        >
            <h6>{props.title}</h6>
        </div>
    )
}

export default Heading