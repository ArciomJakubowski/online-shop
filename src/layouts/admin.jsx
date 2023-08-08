import React from "react";
import { useParams } from "react-router-dom";
import AdminPage from "../components/page/adminPage";
import AdminProductForm from "../components/ui/adminCreateProductForm";
import AdminEditProductForm from "../components/ui/adminUpdateProductForm";

const Admin = () => {
    const params = useParams();
    console.log("params", params);
    const { create, edit } = params;

    console.log("edit", edit);
    console.log("create", create);
    return (
        <>
            {create ? (
                <AdminProductForm />
            ) : edit ? (
                <AdminEditProductForm />
            ) : (
                <AdminPage />
            )}
        </>
    );
};

export default Admin;
