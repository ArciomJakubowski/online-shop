import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Proptypes from "prop-types";

const CarouselBox = ({ product1, product2, product3 }) => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={product1.thumbnail}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>{product1.title}</h3>
                    <p>{product1.description}</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={product2.thumbnail}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>{product2.title}</h3>
                    <p>{product2.description}</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={product3.thumbnail}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>{product3.title}</h3>
                    <p>{product3.description}</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

CarouselBox.propTypes = {
    product1: Proptypes.object.isRequired,
    product2: Proptypes.object.isRequired,
    product3: Proptypes.object.isRequired
};

export default CarouselBox;
