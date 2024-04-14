import React from 'react';
import { Spin } from 'antd';

const Loading = () => {

    return (
        <div className="loading">
            <Spin style={{ margin: 'auto' }} size="large" />
        </div>
    )
}

export default Loading