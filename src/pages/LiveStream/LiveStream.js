import React, { useState, useEffect } from 'react';
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callLiveStreamingAPI, callUpdateLiveStreamingAPI } from '../../actions/Livestreaming';
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
const LiveStream = props => {
    const [streamingData, setStreamingData] = useState({});

    useEffect(() => {
        getStreamData();
    }, []);
    // adv_link: "https://livestream.lmmappstore.com:3687/stream/play.m3u8"
    // created_at: "2019-06-24 11:58:09"
    // link: "https://cash.app/$DJHERMAN"
    // live_status: 0
    // updated_at: "2020-11-18 13:18:41"
    // vls_id: 1
    const getStreamData = () => {
        props.callLiveStreamingAPIAction()
            .then((response) => {
                console.log("streaming data", response);
                setStreamingData(response.data.data)

            })
            .catch((error) => {
                console.log(error);
            });
    }
    const handleChangeAirLink = (e) => {
        console.log(e.target.name);
        console.log(e.target.value, typeof e.target.value);

        const data = { ...streamingData };
        if (streamingData) {
            data[e.target.name] = e.target.value;

        }
        setStreamingData(data);
    }
    // const handleChangeAdvertising= (e) =>{
    //     setLiveStreamErr("");
    //     setStreamingData(e.target.value);
    //     console.log("nnn", e.target.value);
    //     setIsEdit(true);
    //     const data = { ...details };
    //     if (details) {
    //         data.name = e.target.value;
    //     }
    //     setDetails(data);
    // }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.callUpdateLiveStreamingAPIAction(
            streamingData.link,
            streamingData.adv_link,
            streamingData.live_status)
            .then((response) => {
                console.log('Update Live Stream Data', response);
                if (response.data.status) {
                    CustomeNotification("success", "Updated Successfully", "Success", 2000);
                }
            }).catch((err) => {
                console.log(err);
            });

    }

    return (
        <>
            <div className="row">
                <div className="col-md-12 stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">
                                Live Streaming
                           </h6>
                            <div className="cmxform"
                                id="signupForm"
                                method="get"
                                action="#"
                                noValidate="novalidate">
                                <fieldset>
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <TextFieldComponent
                                                    type="text"
                                                    className=""
                                                    id="songname"
                                                    label="On Air Link"
                                                    labelClassName=""
                                                    inputClassName=""
                                                    name="link"
                                                    // error={liveStreamErr ? true : false}
                                                    // helperText={liveStreamErr}
                                                    // helperTextClassName="errormsg"
                                                    isDisable={false}
                                                    placeholder="Enter Air Link"
                                                    onChange={handleChangeAirLink}
                                                    value={streamingData.link}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <TextFieldComponent
                                                    type="text"
                                                    className=""
                                                    id="songname"
                                                    label="URL For Advertising"
                                                    labelClassName=""
                                                    name="adv_link"
                                                    inputClassName=""
                                                    // error={radioErr ? true : false}
                                                    // helperText={radioErr}
                                                    // helperTextClassName="errormsg"
                                                    isDisable={false}
                                                    placeholder="Enter Advertising URL"
                                                    onChange={handleChangeAirLink}
                                                    value={streamingData.adv_link}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="name">Select Option</label><br />
                                                <div className="form-check form-check-inline">
                                                    <label className="form-check-label">
                                                        <input
                                                            type="radio"
                                                            className="form-check-input"
                                                            // name="radio"
                                                            id="optionsRadios"
                                                            // checked="true"
                                                            // checked={streamingData.live_status == "1" ? true : false}
                                                            value={1}
                                                            name="live_status"
                                                            checked={streamingData.live_status == 1}
                                                            defaultValue="option5"
                                                            onChange={handleChangeAirLink}
                                                        // onClick={handleChangeAirLink}
                                                        // onClick={() => handleChangeRadio('1')}
                                                        />
                                                            Online
                                                        <i className="input-frame" />
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline ">
                                                    <label className="form-check-label">
                                                        <input
                                                            type="radio"
                                                            className="form-check-input"
                                                            name="live_status"
                                                            checked={streamingData.live_status == 0}
                                                            id="optionsRadios"
                                                            defaultValue="option5"
                                                            defaultChecked
                                                            value={0}
                                                            onChange={handleChangeAirLink}
                                                        // onClick={handleChangeAirLink}
                                                        />
                                                              Offline
                                                        <i className="input-frame" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <input
                                        className="btn btn-primary"
                                        type="submit"
                                        defaultValue="Submit"
                                        onClick={handleSubmit}
                                    />
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            callLiveStreamingAPIAction: callLiveStreamingAPI,
            callUpdateLiveStreamingAPIAction: callUpdateLiveStreamingAPI
        },
        dispatch,
    );

export default connect(null, mapDispatchToProps)(LiveStream);