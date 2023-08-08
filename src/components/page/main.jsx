import React from "react";
import { useSelector } from "react-redux";
import { getProducts } from "../../store/products";
import CarouselBox from "../carouselBox";
import NavBar from "../ui/navBar";

const Main = () => {
    const products = useSelector(getProducts());
    const id = "main page";

    if (products) {
        const product1 = products[0];
        const product2 = products[1];
        const product3 = products[5];

        return (
            <>
                <NavBar id={id} />

                <div className="container">
                    <div className="mt-5">
                        <h1 className="red">Best Sellers 2023</h1>
                        <hr />
                        <CarouselBox
                            product1={product1}
                            product2={product2}
                            product3={product3}
                        />
                    </div>
                </div>
            </>
        );
    }
};

export default Main;
