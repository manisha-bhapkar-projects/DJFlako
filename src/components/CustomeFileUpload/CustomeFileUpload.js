import React from "react";
import { Progress } from "react-sweet-progress";
import Loader from "react-loader-spinner";

const CustomeFileUpload = ({
  hiddenFileInput,
  handleChangeImage,
  value,
  handleClickFile,
  title,
  uploadPercentage,
  helperText,
  error,
  helperTextClassName,
  isImgLoading
}) => {
  return (
    <>
        <div className="form-group mb-0">
            <label>{title}</label>
            <input
              type="file"
              name="img[]"
              className="file-upload-default"
              accept=".jpg, .jpeg, .png"
              ref={hiddenFileInput}
              onChange={handleChangeImage}
              style={{ display: "none" }}
            />
            <div className="input-group col-xs-12">
              <input
                type="text"
                className="form-control file-upload-info"
                value={value}
                placeholder="Upload Image"
              />

              <span className="input-group-append">
                <button
                  onClick={handleClickFile}
                  className="file-upload-browse btn btn-primary"
                  type="button"
                >
                  Upload
                </button>
              </span>
            </div>

            {helperText && error ? (
              <small
                className={
                  error
                    ? `${helperTextClassName} errormsg`
                    : `${helperTextClassName}`
                }
              >
                {helperText}
              </small>
            ) : (
              ""
            )}
        </div>
        {/* {uploadPercentage > 0 && (
          <Progress
            percent={uploadPercentage}
            label={`${uploadPercentage}%`}
            status="active"
          />
        )} */}

                        {isImgLoading ?   
                         <Loader
                          type="Oval"
                          color="#727cf5"
                          height={30}
                          width={30}
                          timeout={3000000} //3 secs
                        /> : 
                        <></>
                        
                        }

      </>
  );
};

export default CustomeFileUpload;
