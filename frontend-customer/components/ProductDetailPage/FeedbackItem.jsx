import React from 'react'
import { Rate } from 'antd'
import { formatDate } from '../../helpers/format.js'

const FeedbackItem = (props) => {

    const { customer, rate, colour, size, content, createdAt } = props

    return (
        <div className="feedback-item col-6">
            <div className="line-feedback row">
                <div className="col-3">
                    <Rate
                        allowHalf
                        disabled={true}
                        value={rate}
                    />
                </div>
                <div className="feedback-content-container col-9">
                    <div className='d-flex align-items-start flex-column'>
                        <div className="feedback-user-name">
                            {customer}
                        </div>
                        <div className='feedback-colour'>
                            {`${colour} / ${size}`}
                        </div>
                        <div className='feedback-content mt-auto align-self-start'>
                            {content}
                        </div>
                        <div className='feedback-date'>
                            {formatDate(createdAt)}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default FeedbackItem