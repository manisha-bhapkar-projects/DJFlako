import React, { useState } from "react";
import constants from "../../utils/constants";
import { useHistory, Link } from "react-router-dom";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";


const ChangePassword = () => {
    const [isNameError, setNameError] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [confirmPswdErr, setconfirmPswdErr] = useState("");
    const [confirmPswd, setconfirmPswd] = useState("");
    const [pswdNotMatchErr, setpswdNotMatchErr] = useState("");
    const [verifyCode, setVerifycode] = useState("");
    const [verifyCodeErr, setVerifycodeErr] = useState("");
    const [showPassword, setShowPassword] = useState(false);



    const history = useHistory();
    function validateEmail(name) {
        const nameRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,5}$/;
        if (name && nameRegex.test(name.trim())) {
            return true;
        }
        return false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            name.trim() === "" ||
            password.trim() === "" ||
            !validateEmail(name) ||
            confirmPswd.trim() === "" ||
            password.trim() !== confirmPswd.trim() ||
            verifyCode.trim() === ""
        ) {

            if (name.trim() === "") {
                setNameError("Enter Email");
            }

            else if (!validateEmail(name)) {
                setNameError("Enter Valid Email");
            }

            if (password.trim() === "") {
                setPasswordErr("Enter Password");
            }
            if (confirmPswd.trim() === "") {
                setconfirmPswdErr("Enter Confirm Password");
            }
            else if (password.trim() !== confirmPswd.trim()) {
                setpswdNotMatchErr("Password Doesn't Match");
            }
            if (verifyCode.trim() === "") {
                setVerifycodeErr("Enter Verification Code");
            }


            return null;

        }
        history.push(constants.ROUTE.LOGIN.LOGIN);
    }

    const handleChangeName = (e) => {
        setNameError("");
        setName(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPasswordErr("");
        setPassword(e.target.value);
    };
    const handleChangeConfirmPassword = (e) => {
        setconfirmPswdErr("");
        setpswdNotMatchErr("");
        setconfirmPswd(e.target.value);
    };
    const handleVerificationCode = (e) => {
        setVerifycodeErr("");
        setVerifycode(e.target.value);
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
                                        <form className="forms-sample">
                                            <h4 className="my-3">Change Password</h4>
                                            <div className="form-group">
                                                {/* <label htmlFor="exampleInputEmail1">Email address</label>
                                                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" /> */}
                                                <TextFieldComponent
                                                    className=""
                                                    id="eventname"
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
                                            <div className="form-group">
                                                {/* <label htmlFor="exampleInputEmail1">Verification Code</label>
                                                    <input type="number" className="form-control" id="exampleInputEmail1" placeholder="Email" /> */}
                                                <TextFieldComponent
                                                    type="number"
                                                    className=""
                                                    id="verifyCode"
                                                    label="Verification Code"
                                                    labelClassName=""
                                                    inputClassName=""
                                                    error={verifyCodeErr ? true : false}
                                                    helperText={verifyCodeErr}
                                                    helperTextClassName="errormsg"
                                                    isDisable={false}
                                                    placeholder="Verification Code"
                                                    onChange={handleVerificationCode}
                                                    value={verifyCode}
                                                />
                                            </div>
                                            <div className="form-group col-13 pass-login">

                                                <TextFieldComponent
                                                    type={showPassword ? "text" : "password"}

                                                    className=""
                                                    id="eventname"
                                                    label="Password"
                                                    labelClassName=""
                                                    inputClassName=""
                                                    error={passwordErr ? true : false}
                                                    helperText={passwordErr}
                                                    helperTextClassName="errormsg"
                                                    isDisable={false}
                                                    placeholder="Password"
                                                    onChange={handleChangePassword}
                                                    value={password}
                                                />
                                                <div
                                                    className="show-password"
                                                    onClick={() => setShowPassword(!showPassword)}>
                                                    <i className="nav-link-icon fa fa-eye"> </i>

                                                </div>
                                            </div>
                                            <div className="form-group col-13 pass-login">

                                                <TextFieldComponent
                                                    type={showPassword ? "text" : "password"}

                                                    className=""
                                                    id="eventname"
                                                    label="Confirm Password"
                                                    labelClassName=""
                                                    inputClassName=""
                                                    error={confirmPswdErr ? true : false}
                                                    helperText={confirmPswdErr}
                                                    helperTextClassName="errormsg"
                                                    isDisable={false}
                                                    placeholder="Confirm Password"
                                                    onChange={handleChangeConfirmPassword}
                                                    value={confirmPswd}
                                                />
                                                <div
                                                    className="show-password"
                                                    onClick={() => setShowPassword(!showPassword)}>
                                                    <i className="nav-link-icon fa fa-eye"> </i>
                                                </div>
                                                <div className="errormsg">
                                                    {pswdNotMatchErr ? pswdNotMatchErr : null}
                                                </div>

                                            </div>

                                            <div className="mt-3">
                                                <button
                                                    onClick={handleSubmit}
                                                    type="submit"
                                                    className="btn btn-primary mr-2 mb-2 mb-md-0">
                                                    Submit</button>
                                            </div>
                                        </form>
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


export default ChangePassword;

