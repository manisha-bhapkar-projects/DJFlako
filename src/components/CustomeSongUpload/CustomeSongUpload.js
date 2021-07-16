import React from "react";
import { Progress } from "react-sweet-progress";
import Loader from "react-loader-spinner";

const CustomeSongUpload = ({
  hiddensongInput,
  handleChangesong,
  value,
  handleClickSong,
  helperTextClassName,
  uploadSongPercentage,
  helperText,
  isLoading,
  error,
}) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor="name">
          Upload Song
          <small>(only .mp3*)</small>
        </label>
        <input
          type="file"
          name="img[]"
          className="file-upload-default"
          accept=".mp3"
          ref={hiddensongInput}
          onChange={handleChangesong}
          style={{ display: "none" }}
        />
        <div className="input-group col-xs-12">
          <input
            type="text"
            className="form-control file-upload-info"
            placeholder="Upload Song"
            value={value}
          />
          <span className="input-group-append">
            <button
              onClick={handleClickSong}
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
      {/* {uploadSongPercentage > 0 && (
        <Progress
          percent={uploadSongPercentage}
          label={`${uploadSongPercentage}%`}
          status="active"
        />
      )} */}
{/* 
      {isLoading ? (
        <div
          // style={{ padding: 100 }}
          // className="loader-center text-center align-self-center"
        >
          <Loader
            // className="custome-loader"
            type="Puff"
            color="#1E447B"
            height={100}
            width={100}
            visible={true}
            timeout={3000000} //3 secs
          />
        </div>
      ) : (
        <></>
      )} */}

                        {isLoading ?   
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

export default CustomeSongUpload;
