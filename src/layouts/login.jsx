import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";
import { getIsLoggedIn } from "../store/users";

const Login = () => {
    const IsLoggedIn = useSelector(getIsLoggedIn());
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );

    const toggleFormType = () => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {formType === "register" ? (
                        <>
                            <h3 className="mb-4">Register Form</h3>

                            <RegisterForm />
                            <p>
                                Already have account ?
                                <a role="button" onClick={toggleFormType}>
                                    Sign In
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4">Login</h3>
                            <LoginForm />
                            {!IsLoggedIn && (
                                <p>
                                    Dont have account?{" "}
                                    <a
                                        className="text-primary"
                                        role="button"
                                        onClick={toggleFormType}
                                    >
                                        Sign Up
                                    </a>
                                </p>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;

// onClick={toggleFormType}
