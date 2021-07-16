import React, { useState } from "react";
import constants from "../../utils/constants";
import { useHistory, Link } from "react-router-dom";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";


const ForgotPassword = () => {
    const [isNameError, setNameError] = useState("");
    const [name, setName] = useState("");

    const history = useHistory();

    function validateEmail(name) {
        const nameRegex =   /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,5}$/;

        if (name && nameRegex.test(name.trim())) {
            return true;
        }
        return false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            name.trim() === "" ||
            !validateEmail(name)
        ) {

            if ((name.trim() === "")) {
                setNameError("Enter Email");
            }

           else if (!validateEmail(name)) {
                setNameError("Enter Valid Email");
            }

            return null;

        }
        history.push(constants.ROUTE.LOGIN.CHANGE_PASSWORD);
    }



    const handleChangeName = (e) => {
        setNameError("");
        setName(e.target.value);
    };



    return (

        <div className="page-wrapper full-page">
            <div className="page-content d-flex align-items-center justify-content-center">
                <div className="row w-100 mx-0 auth-page">
                    <div className="col-md-6 col-xl-5 mx-auto">
                        <div className="card">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="auth-form-wrapper  px-5 py-5">
                                        <a href="#" className="noble-ui-logo d-block mb-2">DJ <span>Flako</span></a>
                                        <div className="forms-sample">
                                            <h4 className="my-3">Forgot Password</h4>
                                            <div className="form-group">

                                                <TextFieldComponent
                                                    className=""
                                                    id="name"
                                                    label="Email address"
                                                    labelClassName=""
                                                    inputClassName=""
                                                    error={isNameError ? true : false}
                                                    helperText={isNameError}
                                                    helperTextClassName="errormsg"
                                                    isDisable={false}
                                                    placeholder="Email"
                                                    onChange={handleChangeName}
                                                    value={name}
                                                />
                                            </div>
                                            <div>
                                                <small>(Verification Code Send Your Email)</small>
                                            </div>
                                            <div className="mt-3">
                                                <button
                                                    onClick={handleSubmit}
                                                    type="submit"
                                                    className="btn btn-primary mr-2 mb-2 mb-md-0">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>





    );
};


export default ForgotPassword;

