import React from 'react';

const InputStype = {
    height: "40px",
    margin: "9px 0",
    padding: "5px 20px",
    border: '1px solid #D9D9D9',
    borderRadius: "16px",
    fontSize: '14px',
    lineHeight: 1.5,
    fontWeight: 400
}

const Input = (props) => {
    const { placeholder, type, value, onChange, error, disabled, inputRef } = props;

    return (
        <div className='input-component'>
            <input
                className='w-100'
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                style={InputStype}
                ref={inputRef}
            />
            <div className='d-flex'>
                {error && <span className='text-left text-danger' style={{ fontSize: '12px' }}>{error}</span>}
            </div>
        </div>
    );
};

export default Input;