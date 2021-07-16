import React, { useState , useEffect} from 'react';
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { callRadioAPI , callUpdateRadioApi} from '../../actions/RadioAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";

const Radio = props => {
    const [radio, setRadio] = useState('');
    const [radioErr, setRadioErr] = useState('');

    useEffect(() => {
        getRadio();
      }, []);
    
      const getRadio = () => {
        props.callRadioAPIAction()
          .then((response) => {
            console.log("Radio data",response);
            setRadio(response.data.radio_link)
            
          })
          .catch((error) => {
            console.log(error);
          });
      }


    const reqParam = {
        radio: radio.trim(),
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            radio.trim() === ""
        ) {
            if (radio.trim() === "") {
                setRadioErr("Enter Radio Link");
            }
            return null;
        }
        props.callUpdateRadioApiAction(radio)
            .then((response) => {
                console.log('Update Radio', response);
                if (response.data.status) {
                    CustomeNotification("success", "Updated Successfully", "Success", 2000);
                }
            }).catch((err) => {
                console.log(err);
            });

    }
    const handleChangeRadio = (e) => {
        setRadioErr("");
        setRadio(e.target.value);
    };
    return (
        <div>
            <nav className="page-breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active ml-2" 
                    aria-current="page">
                        Add Radio Link
                    </li>
                </ol>
            </nav>
            <div className="row">
                <div className="col-md-12 stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">
                                Add New Radio Link</h6>
                            <div className="cmxform"
                                id="signupForm"
                                method="get"
                                action="#"
                                noValidate="novalidate">
                                <fieldset>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <TextFieldComponent
                                                    type="text"
                                                    className=""
                                                    id="songname"
                                                    label="Name Of Radio Link"
                                                    labelClassName=""
                                                    inputClassName=""
                                                    error={radioErr ? true : false}
                                                    helperText={radioErr}
                                                    helperTextClassName="errormsg"
                                                    isDisable={false}
                                                    placeholder="Enter Category Name"
                                                    onChange={handleChangeRadio}
                                                    value={radio}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <input
                                        className="btn btn-primary"
                                        type="submit"
                                        defaultValue="Submit"
                                        onClick={handleSubmit} />
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            callRadioAPIAction: callRadioAPI,
            callUpdateRadioApiAction: callUpdateRadioApi

        },
        dispatch,
    );

export default connect(null, mapDispatchToProps)(Radio);
