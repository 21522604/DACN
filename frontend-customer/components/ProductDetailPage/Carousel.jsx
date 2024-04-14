
function CarouselFade(props) {
    return (
        <div id="carouselExampleIndicators" data-bs-interval="false" className="carousel slide">
            <div className="carousel-indicators">
                {
                    props.product_image && props.product_image.map((item, index) => {
                        return (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide-to={index}
                                className="active"
                                aria-current="true"
                                aria-label="Slide 1">
                                <img src={item} alt="" />
                            </button>
                        )
                    })
                }
            </div>
            <div className="carousel-inner">
                {
                    props.product_image && props.product_image.map((item, index) => {
                        return (
                            index == 0 ?
                                <div key={index} className="carousel-item active">
                                    <img src={item} className="d-block w-100" alt="..." />
                                </div> :
                                <div key={index} className="carousel-item">
                                    <img src={item} className="d-block w-100" alt="..." />
                                </div>
                        )
                    })
                }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default CarouselFade;