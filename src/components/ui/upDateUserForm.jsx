import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCurrentUserData, updateData } from "../../store/users";
import RadioField from "../form/radioField";
import TextField from "../form/textField";

const UpDateUserPageForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserData());
    console.log("currentUser", currentUser);

    const [data, setData] = useState();
    console.log("data", data);

    const [errors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const handleOpenUserPage = () => {
        history.push(`/users/${currentUser.id}`);
    };

    useEffect(() => {
        setData(currentUser);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("data", data);
        dispatch(updateData(data));
        handleOpenUserPage();
    };

    if (!data) return "Loading...";
    return (
        <>
            <div className="container mt-5">
                <button
                    className="btn btn-primary mt-5 ms-5"
                    onClick={handleOpenUserPage}
                >
                    <i className="bi bi-caret-left"></i>Назад
                </button>
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />

                            {/* <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            /> */}

                            <RadioField
                                name="sex"
                                value={data.sex}
                                label="Выберите ваш пол"
                                onChange={handleChange}
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                            />

                            <button
                                className="btn btn-primary w-100 mx-auto"
                                type="submit"
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpDateUserPageForm;
