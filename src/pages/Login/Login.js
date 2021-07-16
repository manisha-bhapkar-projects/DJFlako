import React, { useState } from 'react';
import PropTypes from 'prop-types';
import constants from "../../utils/constants";
import { useHistory, Link } from "react-router-dom";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import {
    storeAuthToken,
    storeRefreshToken,
    storeAdminData,
  } from "../../utils/storage/index";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import { callLoginApi } from '../../actions/AuthAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Login = props => {
    const [isEmailError, setEmailError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        props.callLoginApiAction({ email, password, })
        .then((response) => {
          console.log('login', response);
          if (response.data.status === 1) {
            storeAuthToken(response.data.token);
            // storeRefreshToken(response.data.result.refresh_token);
            // storeAdminData(response.data.result);
            props.history.push(constants.ROUTE.SIDEBAR.DASHBOARD);
            CustomeNotification("success", response.data.msg, "Success", 2000);
  
          } else  {
            // CustomeNotification("error", response.data.msg[0], "Error", 2000);
            // CustomeNotification("error", response.data.msg[1], "Error", 2000);
            CustomeNotification("error", response.data.msg, "Error", 2000);
          }
        }).catch((err) => {
        });
    }


    const handleChangeName = (e) => {
        setEmailError("");
        setEmail(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPasswordErr("");
        setPassword(e.target.value);
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
                                        <a href="#" className="noble-ui-logo d-block mb-2">
                                          DJ <span>Flako</span></a>
                                        <div className="forms-sample">
                                            <div className="form-group">

                                                <TextFieldComponent
                                                    className=""
                                                    id="eventname"
                                                    label="Email address"
                                                    labelClassName=""
                                                    inputClassName=""
                                                    error={isEmailError ? true : false}
                                                    helperText={isEmailError}
                                                    helperTextClassName="errormsg"
                                                    isDisable={false}
                                                    placeholder="Email"
                                                    onChange={handleChangeName}
                                                    value={email}
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
                                            <div className="mt-3">
                                                <button
                                                    onClick={handleSubmit}
                                                    type="submit"
                                                    className="btn btn-primary mr-2 mb-2 mb-md-0">
                                                    Login</button>
                                            </div>

                                            {/* <Link 
                                            onClick={() => 
                                            history.push(constants.ROUTE.LOGIN.FORGOT_PASSWORD)}
                                            className="d-block mt-3 text-muted">
                                            Forgot Password</Link> */}
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

Login.propTypes = {

};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
        callLoginApiAction: callLoginApi
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(Login);