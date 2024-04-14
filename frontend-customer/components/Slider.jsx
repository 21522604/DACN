import React from 'react'
import { Carousel, Image } from 'antd';

const slides = [
    {
        id: 1,
        src: "../img/slider_01.jpg",
        alt: "Slide 1",
    },
    {
        id: 2,
        src: "../img/slider_02.jpg",
        alt: "Slide 2",
    },
    {
        id: 3,
        src: "../img/slider_03.jpg",
        alt: "Slide 3",
    },
]

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const Slider = () => {
    return (
        <Carousel
            effect="fade"
            autoplay="true"
            // dotPosition="left"
        >
            {
                slides && slides.map((item, index) => {
                    return (
                        <div key={index} className="carousel-item">
                            <Image
                                src={item.src}
                                preview={false}
                                alt={item.alt}
                                title={item.alt}
                            />
                        </div>
                    )
                })
            }
        </Carousel>
    )
}

export default Slider