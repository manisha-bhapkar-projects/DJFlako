import React, { useState } from "react";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { callFileUploadAPI } from "../../actions/FileUploadAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import constants from "../../utils/constants";
import { calLAddEventAPI } from "../../actions/EventAction";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import { useHistory, Link } from "react-router-dom";
import "react-sweet-progress/lib/style.css";
import CustomeFileUpload from "../../components/CustomeFileUpload/CustomeFileUpload";

const AddEvents = (props) => {
  const [isNameError, setNameError] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [isAddressError, setAddressError] = useState("");
  const [isDateError, setDateError] = useState("");
  const [isTimeError, setTimeError] = useState("");
  const [isDescriptionError, setDescriptionError] = useState("");
  const [isFileError, setFileError] = useState("");
  const [upload, setUpload] = useState("");
  const [isOpenDate, setIsOpenDate] = useState(false);
  const [isOpenTime, setIsOpenTime] = useState(false);
  const hiddenFileInput = React.useRef(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isImgLoading, setIsImgLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name.trim() === "" ||
      address.trim() === "" ||
      file === "" ||
      date === "" ||
      time === "" ||
      description.trim() === ""
    ) {
      if (name.trim() === "") {
        setNameError("Enter Event Name");
      }
      if (address.trim() === "") {
        setAddressError("Enter Event Address");
      }
      if (file.trim() === "") {
        setFileError("Please Select File");
      }
      if (date === "") {
        setDateError("Enter Event Date");
      }
      if (time === "") {
        setTimeError("Enter Event Time");
      }
      if (description.trim() === "") {
        setDescriptionError("Enter Event Description");
      }
      return null;
    }

    props
      .calLAddEventAPIAction({
        title: name,
        description,
        location: address,
        image: file,
        date: moment(date).format("YYYY/MM/DD"),
        time: moment(time).format("HH:mm:ss"),
      })
      .then((response) => {
        console.log("Add Event", response);
        if (response.data.status) {
          CustomeNotification(
            "success",
            "Event Added Successfully",
            "Success",
            2000
          );
          props.history.push(constants.ROUTE.SIDEBAR.EVENTS);
        } else {
          CustomeNotification("error", response.data.msg, "Error", 2000);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleChangeName = (e) => {
    setNameError("");
    setName(e.target.value);
  };
  const handleChangeAddress = (e) => {
    setAddressError("");
    setAddress(e.target.value);
  };

  const handleChangeDate = (date) => {
    setDateError("");
    setDate(date);
    setIsOpenDate(false);
  };
  const handleChangeTime = (time) => {
    setTimeError("");
    setTime(time);
    console.log("typeof", time);
  };

  const handleChangeDescription = (e) => {
    setDescriptionError("");
    setDescription(e.target.value);
  };

  const handleChange = (event) => {
    setFileError("");
    setIsImgLoading(true);
    const data = new FormData();
    data.append("file", event.target.files[0]);
    props
      .callFileUploadAPIAction(data)
      .then((res) => {
        console.log("upload image", res);
        setFile(res.data.image.length ? res.data.image : "");
        setIsImgLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setUploadPercentage(0);
      });
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <div>
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={constants.ROUTE.SIDEBAR.EVENTS}>Event List</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Event
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-12 stretch-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Add New Event</h6>
              <div
                className="cmxform"
                id="signupForm"
                method="get"
                action="#"
                noValidate="novalidate"
              >
                <fieldset>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <TextFieldComponent
                          className=""
                          id="name"
                          label="Name Of Event"
                          labelClassName=""
                          inputClassName=""
                          error={isNameError ? true : false}
                          helperText={isNameError}
                          helperTextClassName="errormsg"
                          isDisable={false}
                          placeholder="Enter Event Name"
                          onChange={handleChangeName}
                          value={name}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <TextFieldComponent
                          className=""
                          id="address"
                          label="Address"
                          labelClassName=""
                          inputClassName=""
                          error={isAddressError ? true : false}
                          helperText={isAddressError}
                          helperTextClassName="errormsg"
                          isDisable={false}
                          placeholder="Enter Event Place"
                          value={address}
                          onChange={handleChangeAddress}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label>Event Date</label>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container>
                            <KeyboardDatePicker
                              variant="inline"
                              value={date}
                              // value={
                              //     date
                              //       ? Moment(date)
                              //       : ""
                              //   }
                              // value={
                              //     date
                              //         ? moment(date).format("DD/MM/YYYY")
                              //         : ""
                              // }
                              disablePast
                              helperText={null}
                              // formatDate={(date) => moment(date).format('dd/MM/yyyy')}
                              format="dd/MM/yyyy"
                              error={isDateError ? true : false}
                              helperText={isDateError}
                              helperTextClassName="errormsg"
                              onChange={handleChangeDate}
                              KeyboardButtonProps={{
                                onFocus: (e) => {
                                  setIsOpenDate(true);
                                },
                              }}
                              PopoverProps={{
                                disableRestoreFocus: true,
                                onClose: () => {
                                  setIsOpenDate(false);
                                },
                              }}
                              InputProps={{
                                onFocus: () => {
                                  setIsOpenDate(true);
                                },
                              }}
                              open={isOpenDate}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label>Event Time</label>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container>
                            <KeyboardTimePicker
                              variant="inline"
                              value={time}
                              disablePast
                              helperText={null}
                              format="HH:mm:ss"
                              error={isTimeError ? true : false}
                              helperText={isTimeError}
                              helperTextClassName="errormsg"
                              onChange={handleChangeTime}
                              KeyboardButtonProps={{
                                onFocus: (e) => {
                                  setIsOpenTime(true);
                                },
                              }}
                              PopoverProps={{
                                disableRestoreFocus: true,
                                onClose: () => {
                                  setIsOpenTime(false);
                                },
                              }}
                              InputProps={{
                                onFocus: () => {
                                  setIsOpenTime(true);
                                },
                              }}
                              open={isOpenTime}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <CustomeFileUpload
                        title="Banner Upload"
                        hiddenFileInput={hiddenFileInput}
                        handleChangeImage={handleChange}
                        handleClickFile={handleClick}
                        value={file}
                        uploadPercentage={uploadPercentage}
                        error={isFileError ? true : false}
                        helperText={isFileError}
                        isImgLoading = {isImgLoading}

                      />
                    
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="email">Event Description</label>
                        <textarea
                          name="eventdescription"
                          id="eventdescription"
                          rows={5}
                          className="form-control"
                          placeholder="Enter Event Description"
                          defaultValue={""}
                          value={description}
                          onChange={handleChangeDescription}
                        />
                        <div className="errormsg">
                          {isDescriptionError ? isDescriptionError : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <input
                    className="btn btn-primary"
                    type="submit"
                    defaultValue="Submit"
                    onClick={handleSubmit}
                    // disabled={uploadPercentage !== 0}
                    disabled={
                       isImgLoading === true}
                  />
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callFileUploadAPIAction: callFileUploadAPI,
      calLAddEventAPIAction: calLAddEventAPI,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(AddEvents);
