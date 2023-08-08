import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UserLoader from "../components/ui/hoc/userLoader";
import UpDateUserPageForm from "../components/ui/upDateUserForm";
import { getCurrentUserId } from "../store/users";

const Users = () => {
    const params = useParams();

    const { userID, edit } = params;
    const currentUserId = useSelector(getCurrentUserId());
    console.log("userID", userID);
    console.log("currentUserId", currentUserId);
    console.log("edit", edit);

    return (
        <>
            <UserLoader>
                {/* {userID ? <UserPage id={userID} /> : <h1>Loading</h1>} */}
                {userID ? (
                    edit ? (
                        userID === currentUserId ? (
                            <UpDateUserPageForm />
                        ) : (
                            <Redirect to={`/users/${currentUserId}/edit`} />
                        )
                    ) : (
                        <UserPage id={userID} />
                    )
                ) : (
                    <h1>Loading</h1>
                )}
            </UserLoader>
        </>
    );
};

export default Users;
