import React, { useState , useEffect} from 'react';
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { callShareMyAppAPI , callUpdateShareMyAppApi} from '../../actions/ShareMyAppAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";

const ShareMyApplication = props => {
    const [ios_link, setIoslink] = useState('');
    const [android_link, setAndroid] = useState('');
    const [androidLinkErr, setAndroidErr] = useState('');
    const [iosLinkErr, setIoslinkErr] = useState('');
    const [data, setData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);


    useEffect(() => {
      getShareMyApplication();
      }, []);
  
      const getShareMyApplication = () => {
        props.callShareMyAppAPIAction()
          .then((response) => {
            console.log("share my app",response);
            setData(response.data.data);
            setIoslink(response.data.data.ios_link);
            setAndroid(response.data.data.android_link);
            
          })
          .catch((error) => {
            console.log(error);
          });
      }


   
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            ios_link.trim() === "" ||
            android_link.trim() === "" 
          ) {
      
            if (ios_link.trim() === "") {
              setIoslinkErr("Enter IOS Link");
            }
      
            if (android_link.trim() === "") {
              setAndroidErr("Enter Android Link");
            }
            return null;
          }





        props.callUpdateShareMyAppApiAction(ios_link, android_link)
            .then((response) => {
                console.log('Update Share my app', response);
                if (response.data.status) {
                    CustomeNotification(
                        "success", 
                        "Updated Successfully",
                         "Success", 
                         2000);
                }
            }).catch((err) => {
                console.log(err);
            });

    }
    const handleChangeIOS = (e) => {
      setIoslink(e.target.value);
      setIoslinkErr("");
      setIsEdit(true);
        const dataField = { ...data };
        if (dataField) {
          dataField.ios_link = e.target.value;
        }
        setData(dataField);
    };
    const handleChangeAndroid = (e) => {
      setAndroid(e.target.value);
      setAndroidErr("");
      setIsEdit(true);
        const dataField = { ...data };
        if (dataField) {
          dataField.android_link = e.target.value;
        }
        setData(dataField);
    };
    return (
        <div>
            <nav className="page-breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active ml-2" 
                    aria-current="page">
                        Share My Application
                    </li>
                </ol>
            </nav>
            <div className="row">
                <div className="col-md-12 stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">
                            Share My Application</h6>
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
                                                    label="Name Of IOS Link"
                                                    labelClassName=""
                                                    inputClassName=""
                                                    error={iosLinkErr ? true : false}
                                                    helperText={iosLinkErr}
                                                    helperTextClassName="errormsg"
                                                    isDisable={false}
                                                    placeholder="Enter IOS Link"
                                                    onChange={handleChangeIOS}
                                                    value={ios_link}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <TextFieldComponent
                                                    type="text"
                                                    className=""
                                                    id="songname"
                                                    label="Name Of Android Link"
                                                    labelClassName=""
                                                    inputClassName=""
                                                    error={androidLinkErr ? true : false}
                                                    helperText={androidLinkErr}
                                                    helperTextClassName="errormsg"
                                                    isDisable={false}
                                                    placeholder="Enter Android Link"
                                                    onChange={handleChangeAndroid}
                                                    value={android_link}
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
          callShareMyAppAPIAction: callShareMyAppAPI,
          callUpdateShareMyAppApiAction: callUpdateShareMyAppApi

        },
        dispatch,
    );

export default connect(null, mapDispatchToProps)(ShareMyApplication);
