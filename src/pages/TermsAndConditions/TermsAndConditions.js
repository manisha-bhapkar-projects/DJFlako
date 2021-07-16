import React, { useState, useEffect } from 'react';
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { callTermsConditionsAPI, callUpdateTermsAndConditionsApi } from '../../actions/Terms&ConditionsAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import JoditEditor from "jodit-react";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";

const TermsAndConditions = props => {
  // const [title, setTitle] = useState("");
  // const [isTitleError, setTitleError] = useState("");
  const [description, setDescription] = useState("");
  const [isDescriptionError, setDescriptionError] = useState("");
  const [content, setContent] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const config = {
    height: 400,
    placeholder: "typing ...",
    readonly: false,
  };

  useEffect(() => {
    getTermsAndConditions();
    // console.log('dddd', content.description);
    
  }, []);

  const getTermsAndConditions = () => {
    props
      .callTermsConditionsAPIAction()
      .then((response) => {
        console.log('Terms and Conditions', response);
        setContent(response.data.data);
        // console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const reqParam = {
    description: description.trim(),
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // if (
    //   description.trim() === ""

    // ) {

    //   if (description.trim() === "") {
    //     setDescriptionError("Enter Event Description");
    //   }

    //   return null;
    // }
    const temp = { description: content.description };
     props.callUpdateTermsAndConditionsApiAction(temp)
     .then((res) => {
       console.log("Terms Update", res);
      if (res.data.status) {
        CustomeNotification("success", "Updated Successfully", "Success", 2000);
        // setContent(res.data.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
      

  }
//   id: 1
// description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"

  // const handleChangeTitle = (e) => {
  //   setTitleError("");
  //   setTitle(e.target.value);
  // };

  // const handleChangeDescription = (e) => {
  //   // setDescriptionError("");
  //   // setDescription(e.target.value);
  //   setIsEdit(true);
  //   const data = { ...content };
  //   if (content) {
  //       data.description = e.target.value;
  //   }
  //   setContent(data);
  // };

  return (

    <div className="row">
      <div className="col-md-12 stretch-card">
        <div className="card">
          <div className="card-body">
            <h6 className="card-title">
              Add Terms &amp; Conditions
              </h6>
            <div className="cmxform" 
            id="signupForm" 
            method="get" 
            action="#" 
            noValidate="novalidate">
              <fieldset>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">

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
                        value={usersData}
                        onChange={handleChangeDescription} /> */}
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

                      {/* <div className="errormsg">
                        {isDescriptionError ? isDescriptionError : null}
                        </div> */}

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

  );
};


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      callTermsConditionsAPIAction: callTermsConditionsAPI,
      callUpdateTermsAndConditionsApiAction: callUpdateTermsAndConditionsApi
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(TermsAndConditions);