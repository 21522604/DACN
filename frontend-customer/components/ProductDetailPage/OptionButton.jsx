import React, { useEffect, useRef } from 'react'

const OptionButton = (props) => {
    const buttonRef = useRef(null);

    return (
        <div
            ref={buttonRef}
            tabIndex="0"
            onClick={props.getContent}
            className={`option-button d-inline-block text-center border-radius ${props.isSelected ? 'focus' : ''}`}
        >
            <span>{props.content}</span>
        </div>
    )
}

export default OptionButton