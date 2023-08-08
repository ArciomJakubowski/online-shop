import React from "react";
import { useParams } from "react-router-dom";
import ProductsListPage from "../components/page/productsListPage";
import ProductPage from "../components/page/productPage";
// import { useDispatch, useSelector } from "react-redux";
// import { getDataStatus, loadProductsList } from "../store/products";
import ProductsLoader from "../components/ui/hoc/productsLoader";

const Products = () => {
    const params = useParams();

    const { prodId, edit } = params;
    // console.log("prodId", typeof prodId);
    console.log(edit);
    // const dispatch = useDispatch();
    // const dataStatus = useSelector(getDataStatus());
    // useEffect(() => {
    //     if (!dataStatus) dispatch(loadProductsList());
    // }, []);
    // if (!dataStatus) return "Loading...";
    return (
        <>
            <ProductsLoader>
                {prodId ? <ProductPage id={prodId} /> : <ProductsListPage />}
            </ProductsLoader>
        </>
    );
};

export default Products;
