
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
// import { Link } from '@material-ui/core';
// import constants from '../../utils/constants';
// import { callGalleryImageAPI } from '../../actions/GalleryAction';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { callFileUploadAPI } from '../../actions/FileUploadAction';
// import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";

// const AddGallery = props => {
//   const [isNameError, setNameError] = useState("");
//   const [name, setName] = useState("");
//   const [file, setFile] = useState("");
//   const [image, setImage] = useState("");
//   const [image1, setImage1] = useState("");

//   const [isFileError, setFileError] = useState("");
//   const [fileObj, setFileObj] = useState([]);
//   const [fileArr, setFileArr] = useState([]);
//   const hiddenFileInput = React.useRef(null);
//   const [galleryImage, setGalleryImage] = useState('');



//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // if (!galleryImage) {
//     //   setFileError("Please Select File");
//     //   return true;
//     // }

//     // setFileError('');
//     // const image = new FormData();
//     // image.append("image", galleryImage);
//     // props.callGalleryImageAPIAction(image)
//     //   .then(res => {
//     //     console.log("upload image", res);
//     //     setGalleryImage(res.data.image ? res.data.image : '');
//     //     CustomeNotification(
//     //             "success",
//     //             "Image Uploaded Successfully",
//     //             "Success", 2000);
//     //             props.history.push(constants.ROUTE.SIDEBAR.GALLERY);
//     //   })
//     //   .catch((error) => {
//     //     console.log(error);
//     //   });
//     // const data = new FormData();
//     // data.append("image", image);
//      props.callGalleryImageAPIAction(image)
//       .then(res => {
//         console.log("ADD  IMAGES", res);
//         setImage(res.data.image ? res.data.image : '');
//         CustomeNotification(
//           "success",
//           "Image Uploaded Successfully",
//           "Success", 2000);
//           props.history.push(constants.ROUTE.SIDEBAR.GALLERY);

//       })
//       .catch((error) => {
//         console.log(error);
//       });
  

//   }

//   const handleClickFile = event => {
//     hiddenFileInput.current.click();
//     console.log("file");

//   };
// //   const handleChangeImage = event => {
// //     const fileUploaded = event.target.files[0].name;
// //     setGalleryImage(fileUploaded);
 
// // };
//   const handleChangeImage = event => {
//     const fileUploaded = event.target.files[0].name;
//     setImage1(fileUploaded);
//     //   setFile(fileUploaded);
//     //   setFileErr('');
//     const image = new FormData();
//     image.append("file", event.target.files[0]);
//     props.callFileUploadAPIAction(image)
//       .then(res => {
//         console.log("upload image", res);
//         setImage(res.data.image ? res.data.image : '');
//         // setFileErr("");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
 

//   return (

//     <div>
//       <nav className="page-breadcrumb">
//         <ol className="breadcrumb">
//           <li className="breadcrumb-item">
//             <Link to={constants.ROUTE.SIDEBAR.GALLERY}>
//               Gallery List</Link>
//           </li>
//           <li className="breadcrumb-item active"
//             aria-current="page">
//             Add Gallery
//             </li>
//         </ol>
//       </nav>
//       <div className="row">
//         <div className="col-md-12 stretch-card">
//           <div className="card">
//             <div className="card-body">
//               <h6 className="card-title">
//                 Add New Gallery</h6>
//               <form className="cmxform"
//                 id="signupForm"
//                 method="get"
//                 action="#"
//                 noValidate="novalidate">
//                 <fieldset>
//                   <div className="row">
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <div className="form-group">
//                           <label>Banner upload</label>
//                           <input
//                             type="file"
//                             name="img[]"
//                             className="file-upload-default"
//                             accept=".jpg, .jpeg, .png"
//                             ref={hiddenFileInput}
//                             onChange={handleChangeImage}
//                             style={{ display: 'none' }} />
//                           <div className="input-group col-xs-12">
//                             <input
//                               type="text"
//                               className="form-control file-upload-info"
//                               // disabled
//                               value={image1}
//                               placeholder="Upload Image"
//                             />

//                             <span className="input-group-append">

//                               <button
//                                 onClick={handleClickFile}
//                                 className="file-upload-browse btn btn-primary"
//                                 type="button">Upload</button>
//                             </span>
//                           </div>
//                           <div className="errormsg">
//                             {isFileError ? isFileError : null}
//                             </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <input
//                     className="btn btn-primary mt-4"
//                     type="submit"
//                     defaultValue="Submit"
//                     onClick={handleSubmit} />
//                 </fieldset>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//   );
// };

// AddGallery.propTypes = {

// };

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       callGalleryImageAPIAction: callGalleryImageAPI,
//       callFileUploadAPIAction: callFileUploadAPI
//     },
//     dispatch,
//   );

// export default connect(null, mapDispatchToProps)(AddGallery);














































































// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
// import { Link } from '@material-ui/core';
// import constants from '../../utils/constants';
// import { callGalleryImageAPI } from '../../actions/FileUploadAction';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// // import { calLAddEventAPI } from '../../actions/EventAction';
// import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
// const AddGallery = props => {
//   const [isNameError, setNameError] = useState("");
//   const [name, setName] = useState("");
//   const [file, setFile] = useState("");
//   const [isFileError, setFileError] = useState("");
//   const [fileObj, setFileObj] = useState([]);
//   const [fileArr, setFileArr] = useState([]);
//   const hiddenFileInput = React.useRef(null);



//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (
//       // name.trim() === "" ||
//       file === ""

//     ) {
//       // if (name.trim() === "") {
//       //   setNameError("Enter Event Name");
//       // }
//       if (file.trim() === "") {
//         setFileError("Please Select File");
//       }
//       return null;
//     }
//   }

//   const handleChangeName = (e) => {
//     setNameError("");
//     setName(e.target.value);
//   };

//     const handleChange = event => {
//   //     fileObj.push(event.target.files);
//   //     for(let i=0; i < fileObj[0].length;i++){
//   //       fileArr.push(URL.createObjectURL(fileObj[0][i]))
//   //     }
//   //     setFile(fileArr);

//   //  console.log('gfjhg', file);

//   //   setFileError("");

//     const image = new FormData();
//       image.append("image", event.target.files[0]);

//       props.callGalleryImageAPIAction(image)
//           .then(res => {
//               console.log("upload image", res );

//               // setFile(res.data.image.length ? res.data.image : '')
//               // fileObj.push(res.data.image.length ? res.data.image : '');
//               // for(let i=0; i < fileObj[0].length;i++){
//               //         fileArr.push(URL.createObjectURL(fileObj[0][i]))
//               //       }
//               //       setFile(fileArr);
//               // setFileError("");
//           })
//           .catch((error) => {
//               console.log(error);
//           });


//   };


//   const handleClick = event => {
//     hiddenFileInput.current.click();
//     console.log('hhh');

//   };


//   return (

//     <div>
//       <nav className="page-breadcrumb">
//         <ol className="breadcrumb">
//           <li className="breadcrumb-item">
//             <Link to={constants.ROUTE.SIDEBAR.GALLERY}>Gallery List</Link>
//             </li>
//           <li className="breadcrumb-item active" aria-current="page">Add Gallery</li>
//         </ol>
//       </nav>
//       <div className="row">
//         <div className="col-md-12 stretch-card">
//           <div className="card">
//             <div className="card-body">
//               <h6 className="card-title">Add New Gallery</h6>
//               <form className="cmxform" id="signupForm" method="get" action="#" noValidate="novalidate">
//                 <fieldset>
//                   <div className="row">
//                     {/* <div className="col-sm-12">
//                       <div className="form-group">
//                         <TextFieldComponent
//                           className=""
//                           id="eventname"
//                           label="Company Name"
//                           labelClassName=""
//                           inputClassName=""
//                           error={isNameError ? true : false}
//                           helperText={isNameError}
//                           helperTextClassName="errormsg"
//                           isDisable={false}
//                           placeholder="Enter Event Name"
//                           onChange={handleChangeName}
//                           value={name}
//                         />
//                       </div>
//                     </div> */}
//                     <div className="col-sm-12">
//                       <fieldset className="form-group">
//                         <input 
//                         className="btn btn-primary mt-4" 
//                         type="button" 
//                         defaultValue="Upload Multiple Images"
//                         onClick={handleClick} />
//                         <input
//                           type="file"
//                           id="files"
//                           name="files"
//                           style={{ display: 'none' }}
//                           ref={hiddenFileInput}
//                           onChange={handleChange}
//                           className="form-control" 
//                           multiple="mutliple"
//                           />
//                       </fieldset>
//                       <div className="upload-img">
//                         <img className="img-sm" src={file}></img>
//                         {/* {fileArr.map((item)=>(
//                         <img  className="img-sm mr-2" src={item}></img>
//                         ))} */}
//                       </div>
//                     </div>
//                     <div className="errormsg">{isFileError ? isFileError : null}</div>

//                   </div>
//                   <input 
//                   className="btn btn-primary mt-4" 
//                   type="submit" 
//                   defaultValue="Submit"
//                   onClick={handleSubmit} />
//                 </fieldset>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//   );
// };

// AddGallery.propTypes = {

// };

// const mapDispatchToProps = dispatch =>
//     bindActionCreators(
//         {
//           callGalleryImageAPIAction: callGalleryImageAPI,
//         },
//         dispatch,
//     );

// export default connect(null, mapDispatchToProps)(AddGallery);





















import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { Link } from '@material-ui/core';
import constants from '../../utils/constants';
import { callGalleryImageAPI } from '../../actions/GalleryAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { calLAddEventAPI } from '../../actions/EventAction';
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";

const AddGallery = props => {
  const [isNameError, setNameError] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [isFileError, setFileError] = useState("");
  const [fileObj, setFileObj] = useState([]);
  const [fileArr, setFileArr] = useState([]);
  const hiddenFileInput = React.useRef(null);
  const [galleryImage, setGalleryImage] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();
    e.preventDefault();
    if (!galleryImage) {
      setFileError("Please Select File");
      return true;
    }

    setFileError('');
    const image = new FormData();
    image.append("image", galleryImage);
    props.callGalleryImageAPIAction(image)
      .then(res => {
        console.log("upload image", res);
        setGalleryImage(res.data.image ? res.data.image : '');
        CustomeNotification(
                "success",
                "Image Uploaded Successfully",
                "Success", 2000);
                props.history.push(constants.ROUTE.SIDEBAR.GALLERY);
      })
      .catch((error) => {
        console.log(error);
      });
    // const data = new FormData();
    // data.append("image", image);
    //  props.callAddSliderImageAPIAction(data)
    //   .then(res => {
    //     console.log("ADD SLIDER IMAGES", res);
    //     setImage(res.data.image ? res.data.image : '');
    //     CustomeNotification(
    //       "success",
    //       "Image Uploaded Successfully",
    //       "Success", 2000);
    //       props.history.push(constants.ROUTE.SIDEBAR.SLIDER_IMAGES);

    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  

  }

  const handleClickFile = event => {
    hiddenFileInput.current.click();
    console.log("file");

  };
  const handleChangeImage = event => {
    const fileUploaded = event.target.files[0].name;
    setGalleryImage(fileUploaded);
 
};
  // const handleChangeImage = event => {
  //   const fileUploaded = event.target.files[0].name;
  //   setImage(fileUploaded);
  //   //   setFile(fileUploaded);
  //   //   setFileErr('');
  //   const image = new FormData();
  //   image.append("image", event.target.files[0]);
  //   props.callGalleryImageAPIAction(image)
  //     .then(res => {
  //       console.log("upload image", res);
  //       // setImage(res.data.image ? res.data.image : '');
  //       // setFileErr("");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
 

  return (

    <div>
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={constants.ROUTE.SIDEBAR.GALLERY}>
              Gallery List</Link>
          </li>
          <li className="breadcrumb-item active"
            aria-current="page">
            Add Gallery
            </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-12 stretch-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">
                Add New Gallery</h6>
              <form className="cmxform"
                id="signupForm"
                method="get"
                action="#"
                noValidate="novalidate">
                <fieldset>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <div className="form-group">
                          <label>Banner upload</label>
                          <input
                            type="file"
                            name="img[]"
                            className="file-upload-default"
                            accept=".jpg, .jpeg, .png"
                            ref={hiddenFileInput}
                            onChange={handleChangeImage}
                            style={{ display: 'none' }} />
                          <div className="input-group col-xs-12">
                            <input
                              type="text"
                              className="form-control file-upload-info"
                              // disabled
                              value={galleryImage}
                              placeholder="Upload Image"
                            />

                            <span className="input-group-append">

                              <button
                                onClick={handleClickFile}
                                className="file-upload-browse btn btn-primary"
                                type="button">Upload</button>
                            </span>
                          </div>
                          <div className="errormsg">
                            {isFileError ? isFileError : null}
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <input
                    className="btn btn-primary mt-4"
                    type="submit"
                    defaultValue="Submit"
                    onClick={handleSubmit} />
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

AddGallery.propTypes = {

};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      callGalleryImageAPIAction: callGalleryImageAPI,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(AddGallery);














































































// // import React, { useState } from 'react';
// // import PropTypes from 'prop-types';
// // import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
// // import { Link } from '@material-ui/core';
// // import constants from '../../utils/constants';
// // import { callGalleryImageAPI } from '../../actions/FileUploadAction';
// // import { connect } from 'react-redux';
// // import { bindActionCreators } from 'redux';
// // // import { calLAddEventAPI } from '../../actions/EventAction';
// // import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
// // const AddGallery = props => {
// //   const [isNameError, setNameError] = useState("");
// //   const [name, setName] = useState("");
// //   const [file, setFile] = useState("");
// //   const [isFileError, setFileError] = useState("");
// //   const [fileObj, setFileObj] = useState([]);
// //   const [fileArr, setFileArr] = useState([]);
// //   const hiddenFileInput = React.useRef(null);



// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     if (
// //       // name.trim() === "" ||
// //       file === ""

// //     ) {
// //       // if (name.trim() === "") {
// //       //   setNameError("Enter Event Name");
// //       // }
// //       if (file.trim() === "") {
// //         setFileError("Please Select File");
// //       }
// //       return null;
// //     }
// //   }

// //   const handleChangeName = (e) => {
// //     setNameError("");
// //     setName(e.target.value);
// //   };

// //     const handleChange = event => {
// //   //     fileObj.push(event.target.files);
// //   //     for(let i=0; i < fileObj[0].length;i++){
// //   //       fileArr.push(URL.createObjectURL(fileObj[0][i]))
// //   //     }
// //   //     setFile(fileArr);

// //   //  console.log('gfjhg', file);

// //   //   setFileError("");

// //     const image = new FormData();
// //       image.append("image", event.target.files[0]);

// //       props.callGalleryImageAPIAction(image)
// //           .then(res => {
// //               console.log("upload image", res );

// //               // setFile(res.data.image.length ? res.data.image : '')
// //               // fileObj.push(res.data.image.length ? res.data.image : '');
// //               // for(let i=0; i < fileObj[0].length;i++){
// //               //         fileArr.push(URL.createObjectURL(fileObj[0][i]))
// //               //       }
// //               //       setFile(fileArr);
// //               // setFileError("");
// //           })
// //           .catch((error) => {
// //               console.log(error);
// //           });


// //   };


// //   const handleClick = event => {
// //     hiddenFileInput.current.click();
// //     console.log('hhh');

// //   };


// //   return (

// //     <div>
// //       <nav className="page-breadcrumb">
// //         <ol className="breadcrumb">
// //           <li className="breadcrumb-item">
// //             <Link to={constants.ROUTE.SIDEBAR.GALLERY}>Gallery List</Link>
// //             </li>
// //           <li className="breadcrumb-item active" aria-current="page">Add Gallery</li>
// //         </ol>
// //       </nav>
// //       <div className="row">
// //         <div className="col-md-12 stretch-card">
// //           <div className="card">
// //             <div className="card-body">
// //               <h6 className="card-title">Add New Gallery</h6>
// //               <form className="cmxform" id="signupForm" method="get" action="#" noValidate="novalidate">
// //                 <fieldset>
// //                   <div className="row">
// //                     {/* <div className="col-sm-12">
// //                       <div className="form-group">
// //                         <TextFieldComponent
// //                           className=""
// //                           id="eventname"
// //                           label="Company Name"
// //                           labelClassName=""
// //                           inputClassName=""
// //                           error={isNameError ? true : false}
// //                           helperText={isNameError}
// //                           helperTextClassName="errormsg"
// //                           isDisable={false}
// //                           placeholder="Enter Event Name"
// //                           onChange={handleChangeName}
// //                           value={name}
// //                         />
// //                       </div>
// //                     </div> */}
// //                     <div className="col-sm-12">
// //                       <fieldset className="form-group">
// //                         <input 
// //                         className="btn btn-primary mt-4" 
// //                         type="button" 
// //                         defaultValue="Upload Multiple Images"
// //                         onClick={handleClick} />
// //                         <input
// //                           type="file"
// //                           id="files"
// //                           name="files"
// //                           style={{ display: 'none' }}
// //                           ref={hiddenFileInput}
// //                           onChange={handleChange}
// //                           className="form-control" 
// //                           multiple="mutliple"
// //                           />
// //                       </fieldset>
// //                       <div className="upload-img">
// //                         <img className="img-sm" src={file}></img>
// //                         {/* {fileArr.map((item)=>(
// //                         <img  className="img-sm mr-2" src={item}></img>
// //                         ))} */}
// //                       </div>
// //                     </div>
// //                     <div className="errormsg">{isFileError ? isFileError : null}</div>

// //                   </div>
// //                   <input 
// //                   className="btn btn-primary mt-4" 
// //                   type="submit" 
// //                   defaultValue="Submit"
// //                   onClick={handleSubmit} />
// //                 </fieldset>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>

// //   );
// // };

// // AddGallery.propTypes = {

// // };

// // const mapDispatchToProps = dispatch =>
// //     bindActionCreators(
// //         {
// //           callGalleryImageAPIAction: callGalleryImageAPI,
// //         },
// //         dispatch,
// //     );

// // export default connect(null, mapDispatchToProps)(AddGallery);

