import React, { useState , useEffect} from 'react';
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { callSocialLinkAPI , callUpdateSocialLinkApi} from '../../actions/SocialLinksAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";

const SocialLinks = props => {
    const [instagram, setInsta] = useState('');
    const [instagramErr, setInstaErr] = useState('');
    const [facebookErr, setFacebookErr] = useState('');
    const [facebook, setFacebook] = useState('');
    const [twitter, setTwitter] = useState('');
    const [twitterErr, setTwitterErr] = useState('');
    const [mixcloud, setMixcloud] = useState('');
    const [mixcloudErr, setMixcloudErr] = useState('');
    const [data, setData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);


    useEffect(() => {
        getSocialLinks();
      }, []);
  
      const getSocialLinks = () => {
        props.callSocialLinkAPIAction()
          .then((response) => {
            console.log("share my app",response);
            setData(response.data.data);
            setInsta(response.data.data.instagram);
            setMixcloud(response.data.data.mixcloud);
            setFacebook(response.data.data.facebook);
            setTwitter(response.data.data.twitter);

          })
          .catch((error) => {
            console.log(error);
          });
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            instagram.trim() === "" ||
            facebook.trim() === "" ||
            twitter.trim() === "" ||
            mixcloud.trim() === "" 

          ) {
      
            if (instagram.trim() === "") {
                setInstaErr("Enter Instagram Link");
            }
      
            if (facebook.trim() === "") {
                setFacebookErr("Enter Facebook Link");
            }

            if (twitter.trim() === "") {
                setTwitterErr("Enter Twitter Link");
              }

            if (mixcloud.trim() === "") {
                setMixcloudErr("Enter MixCloud Link");
              }
            return null;
          }
        props.callUpdateSocialLinkApiAction(facebook, instagram, twitter, mixcloud)
            .then((response) => {
                console.log('Update Social Link', response);
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
//     facebook: "http://www.fb.com"
// instagram: "http://www.insta.com"
// twitter: "http://www.tweet.com"
// mixcloud: "http://www.mc.com"
    const handleChangeInsta = (e) => {
        setInsta(e.target.value);
        setInstaErr("");
        setIsEdit(true);
        const dataField = { ...data };
        if (dataField) {
          dataField.instagram = e.target.value;
        }
        setData(dataField);
    };
    const handleChangeFacebook = (e) => {
        setFacebook(e.target.value);
        setFacebookErr("");
        setIsEdit(true);
        const dataField = { ...data };
        if (dataField) {
          dataField.facebook = e.target.value;
        }
        setData(dataField);
    };
    const handleChangeTwitter = (e) => {
        setTwitter(e.target.value);
        setTwitterErr("")
        setIsEdit(true);
          const dataField = { ...data };
          if (dataField) {
            dataField.twitter = e.target.value;
          }
          setData(dataField);
      };
      const handleChangeMixcloud = (e) => {
        setMixcloud(e.target.value);
        setMixcloudErr("");
        setIsEdit(true);
          const dataField = { ...data };
          if (dataField) {
            dataField.mixcloud = e.target.value;
          }
          setData(dataField);
      };
    return (
        <div>
            <nav className="page-breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active ml-2" 
                    aria-current="page">
                       Social Links
                    </li>
                </ol>
            </nav>
            <div className="row">
                <div className="col-md-12 stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">
                           Social Links</h6>
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
                                                    label="Instagram"
                                                    labelClassName=""
                                                    inputClassName=""
                                                    error={instagramErr ? true : false}
                                                    helperText={instagramErr}
                                                    helperTextClassName="errormsg"
                                                    isDisable={false}
                                                    placeholder="Instagram Link"
                                                    onChange={handleChangeInsta}
                                                    value={instagram}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <TextFieldComponent
                                                    type="text"
                                                    className=""
                                                    id="songname"
                                                    label="Facebook"
                                                    labelClassName=""
                                                    inputClassName=""
                                                    error={facebookErr ? true : false}
                                                    helperText={facebookErr}
                                                    helperTextClassName="errormsg"
                                                    isDisable={false}
                                                    placeholder="Facebook Link"
                                                    onChange={handleChangeFacebook}
                                                    value={facebook}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <TextFieldComponent
                                                    type="text"
                                                    className=""
                                                    id="songname"
                                                    label="Twitter"
                                                    labelClassName=""
                                                    inputClassName=""
                                                    error={twitterErr ? true : false}
                                                    helperText={twitterErr}
                                                    helperTextClassName="errormsg"
                                                    isDisable={false}
                                                    placeholder="Twitter Link"
                                                    onChange={handleChangeTwitter}
                                                    value={twitter}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <TextFieldComponent
                                                    type="text"
                                                    className=""
                                                    id="songname"
                                                    label="Mixcloud"
                                                    labelClassName=""
                                                    inputClassName=""
                                                    error={mixcloudErr ? true : false}
                                                    helperText={mixcloudErr}
                                                    helperTextClassName="errormsg"
                                                    isDisable={false}
                                                    placeholder="Mixcloud Link"
                                                    onChange={handleChangeMixcloud}
                                                    value={mixcloud}
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
            callSocialLinkAPIAction: callSocialLinkAPI,
            callUpdateSocialLinkApiAction: callUpdateSocialLinkApi

        },
        dispatch,
    );

export default connect(null, mapDispatchToProps)(SocialLinks);
