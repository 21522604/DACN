import React from 'react'

const PolicyItem = (props) => {
    return (
        <div className='policy-item text-center'>
            <div className="icon-box">
                {props.icon}
            </div>
            <div className="des-box">
                <span className='text-justify'>{props.des}</span>
            </div>
        </div>
    )
}

export default PolicyItem