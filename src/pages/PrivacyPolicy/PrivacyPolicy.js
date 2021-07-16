import React, { useState, useEffect } from 'react';
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { callPrivacyPolicyAPI, callUpdatePrivacyApi } from '../../actions/PrivacyPolicyAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import JoditEditor from "jodit-react";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
const PrivacyPolicy = props => {
  // const [title, setTitle] = useState("");
  // const [isTitleError, setTitleError] = useState("");
  const [description, setDescription] = useState("");
  const [isDescriptionError, setDescriptionError] = useState("");
  const [content, setContent] = useState("");

  const config = {
    height: 400,
    placeholder: "typing ...",
    readonly: false,
  };

  useEffect(() => {
    getPrivacyPolicy();
  }, []);

  const getPrivacyPolicy = () => {
    props
      .callPrivacyPolicyAPIAction()
      .then((response) => {
        console.log('Privacy Policy', response);
        // setUserData(response.data.result.finalres);
        setContent(response.data.data);

      })
      .catch((error) => {
        console.log(error);
      });
  }
  const reqParam = {
    // title: title.trim(),
    description: description.trim(),
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // if (
    //   // title.trim() === "" ||
    //   description.trim() === ""

    // ) {

    //   // if (title.trim() === "") {
    //   //   setTitleError("Enter Event Title");
    //   // }

    //   if (description.trim() === "") {
    //     setDescriptionError("Enter Event Description");
    //   }

    //   return null;
    // }
    const temp = { description: content.description };
    props.callUpdatePrivacyApiAction(temp)
    .then((res) => {
      console.log("Privacy Update", res);
     if (res.data.status) {
       CustomeNotification("success", "Updated Successfully" , "Success", 2000);
      //  setContent(res);
     }
   })
   .catch((error) => {
     console.log(error);
   });
     
  }
 
  return (
    <div className="row">
      <div className="col-md-12 stretch-card">
        <div className="card">
          <div className="card-body">
            <h6 className="card-title">Add Privacy Policy</h6>
            <form className="cmxform" id="signupForm" method="get" action="#" noValidate="novalidate">
              <fieldset>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      {/*                     
                      <TextFieldComponent
                        className=""
                        id="eventname"
                        label="Title"
                        labelClassName=""
                        inputClassName=""
                        error={isTitleError ? true : false}
                        helperText={isTitleError}
                        helperTextClassName="errormsg"
                        isDisable={false}
                        placeholder="Enter Event Name"
                        onChange={handleChangeTitle}
                        value={title}
                      /> */}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label htmlFor="email">Description</label>
                      {/* <textarea
                        name="eventdescription"
                        id="eventdescription"
                        rows={5}
                        className="form-control"
                        placeholder="Enter Event Description"
                        defaultValue={""}
                        value={description}
                        onChange={handleChangeDescription} /> */}
                      {/* <div className="errormsg">
                        {isDescriptionError ? isDescriptionError : null}
                        </div> */}

                      <JoditEditor
                        ref={null}
                        value={
                          content.description !== undefined
                            ? `${content.description}`
                            : ""
                        }
                        autofocus
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={(newContent) =>
                          setContent({
                            ...content,
                            description: newContent.target.innerHTML,
                          })
                        }
                      // onChange={handleChangeDescription}
                      // preferred to use only this option to update the content for performance reasons
                      // onChange={(newContent) => {}}
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
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

PrivacyPolicy.propTypes = {

};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      callPrivacyPolicyAPIAction: callPrivacyPolicyAPI,
      callUpdatePrivacyApiAction: callUpdatePrivacyApi
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(PrivacyPolicy);